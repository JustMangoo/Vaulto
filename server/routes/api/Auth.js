const express = require("express");
const crypto = require("crypto");
const User = require("../../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Basic input validation
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{12,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 12 characters long and include an uppercase letter and a number",
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    const user = await User.create({ name, email, passwordHash, salt });
    return res.json({ userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{12,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Invalid password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");
    if (hash !== user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({ userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
