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

router.get("/categories", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("collectionTypes");
    return res.json(user?.collectionTypes || []);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/categories", async (req, res) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ message: "Category required" });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.collectionTypes.includes(category)) {
      user.collectionTypes.push(category);
      await user.save();
    }
    return res.json(user.collectionTypes);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
