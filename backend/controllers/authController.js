const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../utils/tokenCreate");
const { responseReturn } = require("../utils/response");

class authController {
  
  // Universal Login: Works for all 3 roles
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email }).select("+password");
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = await createToken({ id: user.id, role: user.role });

          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None", // Useful if frontend/backend are on different domains
          });

          // CHANGE: Added 'role' to the response object
          // This allows your Redux Thunk to check if(data.role === 'admin')
          responseReturn(res, 200, {
            token,
            role: user.role, // Critical for frontend redirection logic
            name: user.name,
            message: `Login Success`,
          });
        } else {
          responseReturn(res, 401, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  register = async (req, res) => {
    const { email, name, password, role } = req.body;
    try {
      const getUser = await userModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: "Email already exists" });
      } else {
        const user = await userModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10), // Hash password before saving
          role: role || "customer",
        });
        const token = await createToken({ id: user.id, role: user.role });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        responseReturn(res, 201, { token, message: "Register success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  
  };

  // --- FORGOT PASSWORD: OTP GENERATION + RATE LIMITING ---
    forgot_password = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return responseReturn(res, 404, { error: "Email not found" });
            }

            // --- ADVANCED RATE LIMITING ---
            const now = Date.now();
            if (user.passwordResetExpires) {
                const timeRemaining = user.passwordResetExpires - now;
                const totalWindow = 15 * 60 * 1000; // 15 minutes
                const timeSinceLastRequest = totalWindow - timeRemaining;

                // Cooldown: Block if last request was < 60 seconds ago
                if (timeSinceLastRequest < 60 * 1000) {
                    const secondsToWait = Math.ceil((60 * 1000 - timeSinceLastRequest) / 1000);
                    return responseReturn(res, 429, { 
                        error: `Please wait ${secondsToWait} seconds before requesting a new code.` 
                    });
                }
            }

            // CSPRNG: Secure 6-digit OTP
            const otp = crypto.randomInt(100000, 999999).toString();

            // Update user with OTP and 15-minute expiry
            user.passwordResetToken = otp;
            user.passwordResetExpires = now + 15 * 60 * 1000;
            await user.save();
            console.log(`Generated OTP for ${email}: ${otp}`); // For testing purposes only. Remove in production.
            // Return OTP for Frontend EmailJS delivery
            responseReturn(res, 200, { otp, message: "OTP sent to your email" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    };

    // --- RESET PASSWORD: OTP VERIFICATION ---
    reset_password = async (req, res) => {
        const { email, otp, newPassword } = req.body;
        try {
            // Find user with valid OTP and check if it hasn't expired
            const user = await userModel.findOne({
                email,
                passwordResetToken: otp,
                passwordResetExpires: { $gt: Date.now() }
            });

            if (!user) {
                return responseReturn(res, 400, { error: "Invalid or expired OTP" });
            }

            // Hash new password and clear OTP fields atomically
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await userModel.updateOne(
                { _id: user._id },
                { 
                    $set: { password: hashedPassword },
                    $unset: { passwordResetToken: 1, passwordResetExpires: 1 } // Atomic cleanup
                }
            );

            responseReturn(res, 200, { message: "Password updated successfully" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    };
}

module.exports = new authController();
