const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
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
}

module.exports = new authController();
