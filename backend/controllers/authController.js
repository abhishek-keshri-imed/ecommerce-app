const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../utils/tokenCreate");
const { responseReturn } = require("../utils/response");

class authController {

    // --- UNIVERSAL LOGIN ---
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email }).select("+password");
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    // Prevent login if account is not yet approved
                    if (user.status === "pending") {
                        return responseReturn(res, 403, { 
                            error: "Your seller account is pending admin approval." 
                        });
                    }

                    const token = await createToken({ id: user.id, role: user.role });

                    // Secure cookie configuration for cross-domain/local HTTPS
                    res.cookie("accessToken", token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        secure: true, 
                        sameSite: "None",
                        path: "/",
                    });

                    responseReturn(res, 200, {
                        token,
                        role: user.role,
                        name: user.name,
                        message: "Login Success",
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

   // --- REGISTRATION ---
register = async (req, res) => {
    const { email, name, password, role, shopInfo } = req.body;
    
    try {
        const getUser = await userModel.findOne({ email });
        if (getUser) {
            return responseReturn(res, 400, { error: "Email already exists" });
        }

        // --- Logic for status and messages ---
        // 1. If role is seller, status is pending. Otherwise, active.
        const userRole = role || "customer";
        const initialStatus = userRole === "seller" ? "pending" : "active";

        const newUser = await userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: userRole,
            status: initialStatus,
            shopInfo: userRole === "seller" ? { ...shopInfo } : {},
        });

        // 2. Custom success messages
        const successMsg = userRole === "seller" 
            ? "Registration successful! Your account is pending admin approval." 
            : "Registration successful! You can now login to your account.";

        return responseReturn(res, 201, { 
            message: successMsg,
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: newUser.status
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return responseReturn(res, 500, { error: error.message });
    }
};

    // --- FORGOT PASSWORD ---
    forgot_password = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return responseReturn(res, 404, { error: "Email not found" });
            }

            const now = Date.now();
            if (user.passwordResetExpires) {
                const timeRemaining = user.passwordResetExpires - now;
                const totalWindow = 15 * 60 * 1000;
                const timeSinceLastRequest = totalWindow - timeRemaining;

                if (timeSinceLastRequest < 60 * 1000) {
                    const secondsToWait = Math.ceil((60 * 1000 - timeSinceLastRequest) / 1000);
                    return responseReturn(res, 429, { 
                        error: `Please wait ${secondsToWait} seconds before requesting a new code.` 
                    });
                }
            }

            const otp = crypto.randomInt(100000, 999999).toString();
            user.passwordResetToken = otp;
            user.passwordResetExpires = now + 15 * 60 * 1000;
            await user.save();
            console.log(`Password reset OTP for ${email}: ${otp}`);
            responseReturn(res, 200, { otp, message: "OTP sent to your email" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    };

    // --- RESET PASSWORD ---
    reset_password = async (req, res) => {
        const { email, otp, newPassword } = req.body;
        try {
            const user = await userModel.findOne({
                email,
                passwordResetToken: otp,
                passwordResetExpires: { $gt: Date.now() }
            });

            if (!user) {
                return responseReturn(res, 400, { error: "Invalid or expired OTP" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await userModel.updateOne(
                { _id: user._id },
                { 
                    $set: { password: hashedPassword },
                    $unset: { passwordResetToken: 1, passwordResetExpires: 1 }
                }
            );

            responseReturn(res, 200, { message: "Password updated successfully" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    };

    // --- GET USER DATA ---
    get_user = async (req, res) => {
        try {
            const user = await userModel.findById(req.id);
            if (!user) {
                return responseReturn(res, 404, { error: 'User not found' });
            }
            responseReturn(res, 200, { userInfo: user });
        } catch (error) {
            console.error("Get User Error:", error.message);
            responseReturn(res, 500, { error: 'Internal Server Error' });
        }
    };
}

module.exports = new authController();