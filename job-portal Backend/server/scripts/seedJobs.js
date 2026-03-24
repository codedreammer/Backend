require("dotenv").config();
const connectDB = require("../config/db");
const Job = require("../model/jobModel");
const sampleJobs = require("../data/sampleJobs.json");

async function seedJobs() {
  try {
    await connectDB();
    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);
    console.log(`Seeded ${sampleJobs.length} jobs successfully`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed jobs", error.message);
    process.exit(1);
  }
}

seedJobs();
