function SearchBar({
  value,
  onChange,
  onSubmit,
  buttonLabel = "Search Jobs",
  compact = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="row g-2 align-items-center">
        <div className={compact ? "col-12 col-lg-8" : "col-12 col-lg-9"}>
          <input
            type="text"
            className="form-control form-control-lg search-input"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search by title, company, location, or type"
          />
        </div>
        <div className={compact ? "col-12 col-lg-4" : "col-12 col-lg-3"}>
          <button type="submit" className="btn btn-portal-primary w-100">
            {buttonLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
