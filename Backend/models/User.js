const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        avatar: { type: String },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);