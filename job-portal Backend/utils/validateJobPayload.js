const allowedJobTypes = new Set([
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Hybrid",
  "Remote",
]);

const normalizeStringArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};

const sanitizeJobPayload = (payload = {}) => ({
  title: typeof payload.title === "string" ? payload.title.trim() : "",
  company: typeof payload.company === "string" ? payload.company.trim() : "",
  location: typeof payload.location === "string" ? payload.location.trim() : "",
  type: typeof payload.type === "string" ? payload.type.trim() : "Full-time",
  salary: typeof payload.salary === "string" ? payload.salary.trim() : "",
  description: typeof payload.description === "string" ? payload.description.trim() : "",
  requirements: normalizeStringArray(payload.requirements),
  tags: normalizeStringArray(payload.tags),
  applyUrl: typeof payload.applyUrl === "string" ? payload.applyUrl.trim() : "",
});

const validateJobPayload = (payload = {}) => {
  const errors = [];
  const sanitizedPayload = sanitizeJobPayload(payload);

  if (sanitizedPayload.title.length < 2) {
    errors.push("Title must be at least 2 characters long");
  }

  if (sanitizedPayload.company.length < 2) {
    errors.push("Company name must be at least 2 characters long");
  }

  if (sanitizedPayload.location.length < 2) {
    errors.push("Location must be at least 2 characters long");
  }

  if (sanitizedPayload.description.length < 20) {
    errors.push("Description must be at least 20 characters long");
  }

  if (
    sanitizedPayload.type &&
    !allowedJobTypes.has(sanitizedPayload.type)
  ) {
    errors.push("Job type must be one of: Full-time, Part-time, Contract, Internship, Hybrid, Remote");
  }

  if (
    sanitizedPayload.applyUrl &&
    !/^https?:\/\/.+/i.test(sanitizedPayload.applyUrl)
  ) {
    errors.push("Apply URL must start with http:// or https://");
  }

  return {
    errors,
    sanitizedPayload: {
      ...sanitizedPayload,
      salary: sanitizedPayload.salary || "Salary not disclosed",
      type: sanitizedPayload.type || "Full-time",
    },
  };
};

module.exports = {
  allowedJobTypes: [...allowedJobTypes],
  validateJobPayload,
};
