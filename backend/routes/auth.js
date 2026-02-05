const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER
 */

const updateStreak = (user) => {
  const today = new Date();
  const last = new Date(user.lastActiveDate);

  today.setHours(0,0,0,0);
  last.setHours(0,0,0,0);

  const diffDays = Math.floor(
    (today - last) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    user.streak += 1;          // next day → streak++
  } else if (diffDays > 1) {
    user.streak = 1;           // missed days → reset
  }

  user.lastActiveDate = new Date();
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, parentEmail, avatar, difficultyLevel } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      parentEmail,
      avatar: avatar || "😊",
      difficultyLevel: difficultyLevel || "beginner",
    });

    await user.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
