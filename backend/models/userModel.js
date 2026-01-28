const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Hides password by default
    role: {
      type: String,
      default: "customer",
      enum: ["admin", "seller", "customer"], // Production constraint
    },
    image: { type: String, default: "" },
    method: { type: String, default: "manual" }, 
    paymentStatus: { type: String, default: "inactive" }, 
  },
  { timestamps: true } // Automatically tracks creation and updates
);

module.exports = model("users", userSchema);