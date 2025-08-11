const { Router } = require("express");
const Collections = require("../../models/Collections");
const multer = require("multer");
const path = require("path");

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/", async (req, res) => {
  try {
    const CollectionList = await Collections.find({ userId: req.userId });
    if (!CollectionList) throw new Error("No Collection List found");
    res.status(200).json(CollectionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collection = await Collections.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("cover"), async (req, res) => {
  try {
    const fields = JSON.parse(req.body.fields || "[]"); // Parse fields JSON
    const defaultFields = [
      { name: "title", type: "short-text" },
      { name: "cover", type: "image" },
    ];
    const mergedFields = [
      ...defaultFields,
      ...fields.filter((f) => !defaultFields.some((df) => df.name === f.name)),
    ];

    const newCollection = new Collections({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      fields: mergedFields,
      cover: req.file ? `uploads/${path.basename(req.file.path)}` : null,
      userId: req.userId,
    });

    const collection = await newCollection.save();
    res.status(200).json(collection);
  } catch (error) {
    console.warn("❌ Error saving collection:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Collections.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!removed)
      throw Error("Something went wrong while removing the Collection");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
