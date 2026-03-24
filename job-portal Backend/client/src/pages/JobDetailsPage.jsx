import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { getJobById } from "../services/jobsApi";

function JobDetailsPage({ jobs, loading, onToggleFavorite, isFavorite }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(() => jobs.find((item) => item._id === jobId) || null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const selectedJob = jobs.find((item) => item._id === jobId);

    if (selectedJob) {
      setJob(selectedJob);
      return;
    }

    if (loading) {
      return;
    }

    const loadJob = async () => {
      try {
        setDetailsLoading(true);
        const response = await getJobById(jobId);
        setJob(response);
      } catch (error) {
        console.error("Unable to load job details", error);
        setJob(null);
      } finally {
        setDetailsLoading(false);
      }
    };

    loadJob();
  }, [jobId, jobs, loading]);

  if (loading || detailsLoading) {
    return (
      <section className="container-narrow details-shell">
        <LoadingSpinner label="Loading job details..." />
      </section>
    );
  }

  if (!job) {
    return (
      <section className="container-narrow details-shell">
        <EmptyState
          title="Job not found"
          message="This role may have been removed or the URL might be incorrect."
          actionLabel="Return to Jobs"
          actionTo="/jobs"
        />
      </section>
    );
  }

  return (
    <section className="container-narrow details-shell">
      <div className="details-card glass-panel">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-4">
          <div>
            <span className="subtle-kicker">{job.type}</span>
            <h1 className="details-title mt-2 mb-2">{job.title}</h1>
            <p className="text-secondary fs-5 mb-1">{job.company}</p>
            <div className="job-meta mt-3">
              <span className="meta-chip">{job.location}</span>
              <span className="meta-chip">{job.salary || "Salary not disclosed"}</span>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            {job.applyUrl ? (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-portal-primary"
              >
                Apply Now
              </a>
            ) : (
              <button type="button" className="btn btn-portal-primary" disabled>
                Apply link unavailable
              </button>
            )}
            <button
              type="button"
              className="btn btn-portal-secondary"
              onClick={() => onToggleFavorite(job)}
            >
              {isFavorite(job._id) ? "Remove Favorite" : "Add to Favorites"}
            </button>
            <button
              type="button"
              className="btn btn-portal-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="h4 mb-3">Job Description</h2>
          <p className="details-copy mb-0">{job.description}</p>
        </div>

        <div className="mt-4">
          <h2 className="h4 mb-3">Key Requirements</h2>
          {job.requirements?.length ? (
            <ul className="text-secondary mb-0">
              {job.requirements.map((item) => (
                <li key={item} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="details-copy mb-0">Requirements will be shared during the application flow.</p>
          )}
        </div>

        <div className="mt-4">
          <h2 className="h4 mb-3">Skills & Tags</h2>
          <div className="tag-row">
            {(job.tags?.length ? job.tags : ["Team Collaboration", "Communication", "Ownership"]).map(
              (tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-5">
          <Link to="/jobs" className="btn btn-portal-secondary">
            Browse More Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default JobDetailsPage;
