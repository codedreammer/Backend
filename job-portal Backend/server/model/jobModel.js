const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    type: {
      type: String,
      default: "Full-time",
      trim: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Hybrid", "Remote"],
    },
    salary: {
      type: String,
      default: "Salary not disclosed",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    requirements: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    applyUrl: {
      type: String,
      default: "",
      trim: true,
      match: /^$|^https?:\/\/.+/i,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
