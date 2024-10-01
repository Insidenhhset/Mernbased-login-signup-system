const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Set to false for the signup stage
  },
  otp: {
    type: String,
    required: false, // Set to false to avoid validation error during OTP sending
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
