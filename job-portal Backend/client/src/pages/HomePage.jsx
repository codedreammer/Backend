import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function HomePage({
  jobs,
  loading,
  searchTerm,
  setSearchTerm,
  onToggleFavorite,
  isFavorite,
}) {
  const featuredJobs = jobs.slice(0, 6);

  return (
    <>
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalJobs={jobs.length}
      />

      <section id="featured-jobs" className="container-narrow mt-5">
        <div className="section-heading">
          <div>
            <span className="subtle-kicker">Featured roles</span>
            <h2 className="mt-2 mb-2">Fresh opportunities from ambitious teams</h2>
            <p>Start with a handpicked set of roles that reflect the current search.</p>
          </div>
          <Link to="/jobs" className="btn btn-portal-secondary">
            View All Jobs
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : featuredJobs.length ? (
          <div className="jobs-grid">
            {featuredJobs.map((job) => (
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
            message="Try a different keyword or add jobs to the backend collection to populate the home page."
          />
        )}
      </section>
    </>
  );
}

export default HomePage;
