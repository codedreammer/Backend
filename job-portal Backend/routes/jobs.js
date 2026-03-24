const express = require("express");
const mongoose = require("mongoose");
const Job = require("../model/jobModel");
const { validateJobPayload } = require("../utils/validateJobPayload");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search = "", page = "1", limit = "9" } = req.query;
    const pageNumber = Math.max(Number.parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(Number.parseInt(limit, 10) || 9, 1), 24);
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { type: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Job.countDocuments(filter),
    ]);

    res.json({
      jobs,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.max(Math.ceil(total / limitNumber), 1),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { errors, sanitizedPayload } = validateJobPayload(req.body);

    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const job = await Job.create(sanitizedPayload);
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
