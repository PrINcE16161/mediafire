// server/routes/user/files.js
const express = require("express");
const jwt = require("jsonwebtoken");
const MediaFile = require("../../modals/MediaFile");
const { Config } = require("../../config");
const router = express.Router();

const SECRET = Config.SECRET; // should match your login secret

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    const mediaFiles = await MediaFile.find({ owner: decoded.id }).sort({
      _id: -1,
    });
    res.json({ mediaFiles });
  } catch (error) {
    console.error("Error fetching user files:", error);
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
