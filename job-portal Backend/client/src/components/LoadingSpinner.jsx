function LoadingSpinner({ label = "Loading jobs..." }) {
  return (
    <div className="spinner-shell">
      <div>
        <div className="spinner-border text-primary" role="status" aria-hidden="true" />
        <p className="mt-3 mb-0 text-secondary fw-semibold">{label}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
