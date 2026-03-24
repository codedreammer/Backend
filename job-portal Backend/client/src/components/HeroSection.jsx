import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function HeroSection({ searchTerm, setSearchTerm, totalJobs }) {
  const navigate = useNavigate();

  return (
    <section className="container-narrow pt-3 pt-lg-4">
      <div className="hero-card glass-panel">
        <span className="eyebrow">New roles updated daily</span>
        <h1 className="hero-title">Find Your Dream Job</h1>
        <p className="hero-copy mt-3 mb-4">
          Explore curated opportunities across design, engineering, product, and
          operations with a polished search experience that feels ready for a real team.
        </p>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={() => navigate("/jobs")}
          buttonLabel="Explore Roles"
        />

        <div className="d-flex flex-wrap gap-3 mt-4">
          <button className="btn btn-portal-primary" onClick={() => navigate("/jobs")}>
            Browse Open Positions
          </button>
          <a href="#featured-jobs" className="btn btn-portal-secondary">
            View Featured Jobs
          </a>
        </div>

        <div className="hero-metrics">
          <div className="metric-card">
            <div className="metric-value">{totalJobs}+</div>
            <div className="metric-label">Open opportunities</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">40+</div>
            <div className="metric-label">Trusted hiring partners</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">Remote-first</div>
            <div className="metric-label">Flexible roles and hybrid teams</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
