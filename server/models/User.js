const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  collectionTypes: { type: [String], default: [] },
});

module.exports = mongoose.model("User", UserSchema);
