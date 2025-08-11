const mongoose = require("mongoose");

const CollectionItemSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collections",
      required: true,
    },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String },
    fields: { type: Map, of: String }, // dynamic field values
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollectionItem", CollectionItemSchema);
