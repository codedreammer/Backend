const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);

// test route
app.get("/", (req, res) => {
res.send("API is working 🚀");
});

module.exports = app;
