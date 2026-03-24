import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ favoritesCount }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-inner glass-panel d-flex flex-column flex-lg-row align-items-lg-center">
          <div className="d-flex align-items-center justify-content-between w-100">
            <NavLink to="/" className="d-flex align-items-center gap-3" onClick={closeMenu}>
              <span className="brand-mark">JP</span>
              <div>
                <div className="brand-copy">JobPortal</div>
                <small className="text-secondary">Modern hiring experience</small>
              </div>
            </NavLink>

            <button
              type="button"
              className="navbar-toggler border-0 shadow-none"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((current) => !current)}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className={`collapse navbar-collapse justify-content-end ${open ? "show" : ""}`}>
            <div className="navbar-nav align-items-lg-center gap-lg-4 mt-3 mt-lg-0">
              <NavLink to="/" className="nav-link-item" onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/jobs" className="nav-link-item" onClick={closeMenu}>
                Jobs
              </NavLink>
              <NavLink to="/add-job" className="nav-link-item" onClick={closeMenu}>
                Add Job
              </NavLink>
              <NavLink
                to="/favorites"
                className="nav-link-item d-inline-flex align-items-center gap-2"
                onClick={closeMenu}
              >
                Favorites
                <span className="favorites-pill">{favoritesCount}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
