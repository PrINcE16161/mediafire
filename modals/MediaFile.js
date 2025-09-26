// server/modals/MediaFile.js
const mongoose = require("mongoose");

const mediaFileSchema = new mongoose.Schema({
  filename: String,
  filesize: Number,
  path: String,
  visitcount: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to user
});

module.exports = mongoose.model("MediaFile", mediaFileSchema);
