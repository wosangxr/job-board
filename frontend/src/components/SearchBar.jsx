export default function SearchBar({ search, location, type, onSearchChange, onLocationChange, onTypeChange }) {
  return (
    <div className="search-bar" role="search" aria-label="Filter jobs">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search jobs"
        />
      </div>
      <select
        id="filter-location"
        className="filter-select"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        aria-label="Filter by location"
      >
        <option value="">All Locations</option>
        <option value="Bangkok">Bangkok</option>
        <option value="Chiang Mai">Chiang Mai</option>
        <option value="Phuket">Phuket</option>
        <option value="Khon Kaen">Khon Kaen</option>
        <option value="Nonthaburi">Nonthaburi</option>
        <option value="Remote">Remote</option>
      </select>
      <select
        id="filter-type"
        className="filter-select"
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        aria-label="Filter by job type"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Remote">Remote</option>
      </select>
    </div>
  );
}
