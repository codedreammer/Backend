import { sampleJobs } from "./sampleJobs";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getJobs(searchTerm = "") {
  try {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    const queryString = params.toString();
    const response = await request(`/jobs${queryString ? `?${queryString}` : ""}`);
    const jobs = Array.isArray(response) ? response : response.jobs || [];

    return jobs.length ? jobs : sampleJobs;
  } catch (error) {
    console.warn("Falling back to demo jobs", error.message);

    if (!searchTerm.trim()) {
      return sampleJobs;
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();
    return sampleJobs.filter((job) =>
      [job.title, job.company, job.location, job.type, ...(job.tags || [])]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }
}

export async function getJobById(jobId) {
  try {
    return await request(`/jobs/${jobId}`);
  } catch (error) {
    const demoJob = sampleJobs.find((job) => job._id === jobId);

    if (demoJob) {
      return demoJob;
    }

    throw error;
  }
}

export async function createJob(payload) {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.errors?.join(", ") || data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}
