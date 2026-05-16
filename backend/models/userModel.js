const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'seller', 'admin']
    },
    image: {
        type: String,
        default: ""
    },
    method: {
        type: String,
        required: true,
        default: 'local' // Set to 'manual' or 'local' based on your preference
    },
    paymentStatus: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive']
    },
    // Root level status for account approval/locking
    status: {
        type: String,
        default: 'active', 
        enum: ['active', 'pending', 'frozen']
    },
    // Reset Password Fields (Root Level)
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
    // Detailed Shop Information
    shopInfo: {
        shopName: { 
            type: String, 
            trim: true, 
            default: "" 
        },
        shopDescription: { 
            type: String, 
            default: "" 
        },
        businessEmail: { 
            type: String, 
            lowercase: true, 
            default: "" 
        }, 
        phoneNumber: { 
            type: String, 
            default: "" 
        },
        businessAddress: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            zipCode: { type: String, default: "" },
            country: { type: String, default: "" },
        },
        documents: { 
            type: String, 
            default: "" 
        }, 
        taxId: { 
            type: String, 
            default: "" 
        },
        socialLinks: {
            facebook: { type: String, default: "" },
            instagram: { type: String, default: "" },
            twitter: { type: String, default: "" },
        },
    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);