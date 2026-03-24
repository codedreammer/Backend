import { Link } from "react-router-dom";

function JobCard({ job, isFavorite, onToggleFavorite, actionLabel = "Add to Favorites" }) {
  const shortDescription =
    job.description.length > 130
      ? `${job.description.slice(0, 130).trim()}...`
      : job.description;

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <span className="subtle-kicker">{job.type || "Open role"}</span>
          <h3 className="h4 mt-2 mb-1">{job.title}</h3>
          <p className="text-secondary fw-semibold mb-0">{job.company}</p>
        </div>
        <span className="favorites-pill">{isFavorite ? "Saved" : "New"}</span>
      </div>

      <div className="job-meta">
        <span className="meta-chip">{job.location}</span>
        <span className="meta-chip">{job.salary || "Salary not disclosed"}</span>
      </div>

      <p className="job-description">{shortDescription}</p>

      <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
        <Link to={`/jobs/${job._id}`} className="btn btn-portal-primary flex-fill">
          View Details
        </Link>
        <button
          type="button"
          className="btn btn-portal-secondary flex-fill"
          onClick={() => onToggleFavorite(job)}
        >
          {isFavorite ? "Remove Favorite" : actionLabel}
        </button>
      </div>
    </article>
  );
}

export default JobCard;
