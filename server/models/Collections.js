const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String }, // file path
  fields: [fieldSchema],
});

module.exports = mongoose.model("Collections", CollectionSchema);
