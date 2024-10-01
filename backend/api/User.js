const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // Step 1: If user already exists

    if (existingUser && !existingUser.isVerified) {
      return res.json({
        status: "USER_NOT_VERIFIED",
        message: "Email already exists. verify it.",
      });
    } else if (existingUser && existingUser.isVerified) {
      return res.json({
        status: "USER_EXIST",
        message: "Email already exists. Please sign in.",
      });
    }

    // Step 2: If no user exists, hash the password and send OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedOtp = generateOTP();
    const newUser = new User({
      email,
      password: hashedPassword,
      otp: generatedOtp,
      isVerified: false,
    });
    await newUser.save();

    // Send OTP to the user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${generatedOtp}. It will expire in 10 minutes.`,
    });

    return res.json({
      status: "SUCCESS",
      message: "OTP sent to your email. Please verify.",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "FAILED",
      message: "An error occurred during the signup process.",
    });
  }
});

// OTP Verification route
router.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    console.log("Received email:", email, "and otp:", otp);

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "FAILED", message: "User not found." });
    }

    console.log("User found:", user);

    if (user.otp !== otp) {
      return res.json({ status: "OTP-VERIFY-FAIL", message: "Incorrect OTP." });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save({ validateBeforeSave: false });

    return res.json({
      status: "SUCCESS",
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.json({
      status: "FAILED",
      message: "An error occurred during OTP verification.",
    });
  }
});

router.post("/setup-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json("SUCCESS");
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the password." });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  let { email, confirmPassword } = req.body;

  if (!email || !confirmPassword) {
    return res.json({
      status: "FAILED",
      message: "Credentials cannot be empty.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "FAILED", message: "Invalid credentials." });
    }

    if (!user.isVerified) {
      return res.json({
        status: "FAILED",
        message: "Please verify your email.",
      });
    }

    const passwordMatch = await bcrypt.compare(confirmPassword, user.password);
    if (!passwordMatch) {
      return res.json({ status: "FAILED", message: "Invalid password." });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return res.json({
      status: "SUCCESS",
      message: "Sign in successful.",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "FAILED",
      message: "An error occurred during sign-in.",
    });
  }
});

// Signout route
router.post("/signout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ status: "FAILED", message: "Refresh token is required." });
  }

  try {
    // Optionally, you can implement a mechanism to blacklist the refresh token.
    // For example, storing it in a database or cache to prevent future use.

    return res.json({ status: "SUCCESS", message: "Logged out successfully." });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ status: "FAILED", message: "An error occurred." });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // 2. Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" } // Token valid for 15 minutes
    );

    // 3. Create the reset password link with the token
    const resetLink = `http://localhost:5173/ResetPassword?token=${token}`;

    // 4. Send the email with Nodemailer
    const mailOptions = {
      from: "nitesh.shinde062@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Reset password email sent" });
    });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { accessToken, password } = req.body;

  // Check if access token is provided
  if (!accessToken) {
    return res.status(400).json({ message: "Access token is required." });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    // Proceed to reset the password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);

    // Handle token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token has expired." });
    }

    // Handle other JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid access token." });
    }

    res.status(500).json({ message: "Failed to reset password." });
  }
});

module.exports = router;
