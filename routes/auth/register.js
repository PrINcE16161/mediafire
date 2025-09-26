// server/routes/auth/register.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../modals/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.json({ message: "User registered successfully" });
});

module.exports = router;
