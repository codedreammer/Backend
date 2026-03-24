import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJob } from "../services/jobsApi";

const initialFormData = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  salary: "",
  description: "",
  requirements: "",
  tags: "",
  applyUrl: "",
};

function AddJobPage({ onJobCreated, setSearchTerm }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        tags: formData.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const createdJob = await createJob(payload);
      onJobCreated(createdJob);
      setSearchTerm("");
      setSuccessMessage("Job posted successfully. Redirecting to the jobs page...");
      setFormData(initialFormData);

      setTimeout(() => {
        navigate("/jobs");
      }, 900);
    } catch (error) {
      setErrorMessage(error.message || "Unable to create job right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-narrow add-job-shell">
      <div className="section-heading">
        <div>
          <span className="subtle-kicker">Publisher workspace</span>
          <h1 className="mt-2 mb-2">Add a new job</h1>
          <p>Create a role that immediately appears in the job portal once saved.</p>
        </div>
        <Link to="/jobs" className="btn btn-portal-secondary">
          Back to Jobs
        </Link>
      </div>

      <div className="add-job-card glass-panel">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="add-job-sidebar">
              <span className="subtle-kicker">Tips</span>
              <h2 className="h3 mt-2">Make the listing feel complete</h2>
              <p className="details-copy mt-3">
                Clear titles, a useful description, and real application links make the UI feel much
                more like a working product.
              </p>
              <div className="job-meta mt-4">
                <span className="meta-chip">Title required</span>
                <span className="meta-chip">Description 20+ chars</span>
                <span className="meta-chip">Valid apply URL</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <form onSubmit={handleSubmit} className="add-job-form">
              {errorMessage ? (
                <div className="alert alert-danger rounded-4" role="alert">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="alert alert-success rounded-4" role="alert">
                  {successMessage}
                </div>
              ) : null}

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="title">
                    Job title
                  </label>
                  <input
                    id="title"
                    name="title"
                    className="form-control form-control-portal"
                    value={formData.title}
                    onChange={updateField}
                    placeholder="Frontend Developer"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="company">
                    Company name
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="form-control form-control-portal"
                    value={formData.company}
                    onChange={updateField}
                    placeholder="Northstar Labs"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    className="form-control form-control-portal"
                    value={formData.location}
                    onChange={updateField}
                    placeholder="Bengaluru, India"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="type">
                    Job type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="form-select form-control-portal"
                    value={formData.type}
                    onChange={updateField}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="salary">
                    Salary
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    className="form-control form-control-portal"
                    value={formData.salary}
                    onChange={updateField}
                    placeholder="INR 12L - INR 18L"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label form-label-portal" htmlFor="applyUrl">
                    Apply URL
                  </label>
                  <input
                    id="applyUrl"
                    name="applyUrl"
                    type="url"
                    className="form-control form-control-portal"
                    value={formData.applyUrl}
                    onChange={updateField}
                    placeholder="https://company.com/apply"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label form-label-portal" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    className="form-control form-control-portal textarea-portal"
                    value={formData.description}
                    onChange={updateField}
                    placeholder="Describe the role, team, and impact."
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label form-label-portal" htmlFor="requirements">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows="4"
                    className="form-control form-control-portal textarea-portal"
                    value={formData.requirements}
                    onChange={updateField}
                    placeholder={"Add one requirement per line\nReact experience\nNode.js experience"}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label form-label-portal" htmlFor="tags">
                    Tags
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    className="form-control form-control-portal"
                    value={formData.tags}
                    onChange={updateField}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <button type="submit" className="btn btn-portal-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Posting Job..." : "Publish Job"}
                </button>
                <Link to="/jobs" className="btn btn-portal-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddJobPage;
