import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function JobsPage({
  jobs,
  loading,
  searchTerm,
  setSearchTerm,
  onToggleFavorite,
  isFavorite,
}) {
  return (
    <section className="container-narrow listing-shell">
      <div className="section-heading">
        <div>
          <span className="subtle-kicker">Jobs directory</span>
          <h1 className="mt-2 mb-2">Explore matching roles</h1>
          <p>Live filtering updates the list instantly as you type.</p>
        </div>
        <Link to="/add-job" className="btn btn-portal-primary">
          Add New Job
        </Link>
      </div>

      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          buttonLabel="Filter Jobs"
          compact
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : jobs.length ? (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isFavorite={isFavorite(job._id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          message="There are no roles matching your current search. Try a broader keyword or clear the filter."
        />
      )}
    </section>
  );
}

export default JobsPage;
