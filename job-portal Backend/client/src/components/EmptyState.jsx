import { Link } from "react-router-dom";

function EmptyState({
  title,
  message,
  actionLabel = "Browse Jobs",
  actionTo = "/jobs",
}) {
  return (
    <div className="empty-state">
      <div className="empty-card glass-panel">
        <span className="subtle-kicker">Nothing here yet</span>
        <h2 className="mt-3">{title}</h2>
        <p className="empty-copy mt-3 mb-4">{message}</p>
        <Link to={actionTo} className="btn btn-portal-primary">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}

export default EmptyState;
