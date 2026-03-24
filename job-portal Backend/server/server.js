require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const jobsRouter = require("./routes/jobs");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Job portal API is running" });
});

app.use("/api/jobs", jobsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
