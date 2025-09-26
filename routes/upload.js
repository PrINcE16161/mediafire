//server/routes/upload.js
const express = require("express");
const jwt = require("jsonwebtoken");
const MediaFile = require("../modals/MediaFile");
const { Config } = require("../config");

const SECRET = Config.SECRET; // use same secret as in login

const UploadRoute = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const uploadedFile = req.files.file;

    const uniqueFileName = Date.now() + "-" + uploadedFile.name;
    const uploadPath = Config.BASE_DIR + "/uploads/" + uniqueFileName;

    await uploadedFile.mv(uploadPath);

    const mediaFile = new MediaFile({
      filename: uploadedFile.name,
      filesize: uploadedFile.size,
      path: uniqueFileName,
      visitcount: 0,
      owner: decoded.id, // ✅ store user ID from token
    });

    const savedFile = await mediaFile.save();
    res.json({ fileId: savedFile._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(401).send("Unauthorized or Upload failed");
  }
};

module.exports = UploadRoute;
