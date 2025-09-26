const express = require("express");
require("dotenv").config();
require("./database/db");
const { Config } = require("./config");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const UploadRoute = require("./routes/upload");
const ViewFile = require("./routes/viewfile");
const DLFile = require("./routes/dl_file");
const dashboard = require("./routes/dashboard");
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const userFilesRoute = require("./routes/user/files"); // ✅ Added

const app = express();
const port = Config.PORT;

// Middlewares
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(fileUpload());
app.use(cors());
app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/api/upload", UploadRoute);
app.get("/api/view/:id", ViewFile);
app.get("/api/file/:id", DLFile);
app.post("/api/dashboard", dashboard);

// ✅ Auth routes
app.use("/api/auth/register", registerRoute);
app.use("/api/auth/login", loginRoute);

// ✅ User file routes
app.use("/api/user/files", userFilesRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on ${Config.BACKEND_DOMAIN}:${port}`);
});
