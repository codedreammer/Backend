import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";

function FavoritesPage({ favorites, onRemoveFavorite }) {
  return (
    <section className="container-narrow favorites-shell">
      <div className="section-heading">
        <div>
          <span className="subtle-kicker">Saved collection</span>
          <h1 className="mt-2 mb-2">Your favorite jobs</h1>
          <p>Keep track of roles you want to revisit before applying.</p>
        </div>
      </div>

      {favorites.length ? (
        <div className="jobs-grid">
          {favorites.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isFavorite
              onToggleFavorite={() => onRemoveFavorite(job._id)}
              actionLabel="Remove from Favorites"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorite jobs yet"
          message="Save roles from the jobs page and they will appear here with local storage persistence."
        />
      )}
    </section>
  );
}

export default FavoritesPage;
