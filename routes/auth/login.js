// server/routes/auth/login.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { Config } = require("../../config");
const router = express.Router();

const SECRET = Config.SECRET; // move to env/config

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;
