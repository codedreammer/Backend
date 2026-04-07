const express = require("express");
const cors = require("cors");

const app = express();

// routes
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);

// test route
app.get("/", (req, res) => {
res.send("API is working 🚀");
});

module.exports = app;
