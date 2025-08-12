const express = require("express");
const User = require("../../models/User");

const router = express.Router();

router.get("/settings", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("theme");
    return res.json({ theme: user?.theme || "light" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/settings", async (req, res) => {
  const { theme } = req.body;
  if (!theme || !["light", "dark"].includes(theme)) {
    return res.status(400).json({ message: "Invalid theme" });
  }
  try {
    await User.findByIdAndUpdate(req.userId, { theme });
    return res.json({ theme });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
