const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const CollectionItem = require("../../models/CollectionItem");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});
const upload = multer({ storage });

// GET all items in a collection
router.get("/:collectionId", async (req, res) => {
  try {
    const items = await CollectionItem.find({
      collectionId: req.params.collectionId,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single item
router.get("/item/:itemId", async (req, res) => {
  try {
    const item = await CollectionItem.findById(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new item
router.post("/:collectionId", upload.single("cover"), async (req, res) => {
  try {
    const { title, ...restFields } = req.body;
    const newItem = new CollectionItem({
      collectionId: req.params.collectionId,
      title,
      cover: req.file ? `uploads/${req.file.filename}` : undefined,
      fields: restFields, // dynamic fields from form
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
