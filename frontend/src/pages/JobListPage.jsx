import { useState, useEffect, useCallback } from 'react';
import { fetchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs({ search, location, type, page, limit });
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, location, type, page]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, location, type]);

  // Debounce search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <main className="container">
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Discover {total > 0 ? total : ''} opportunities from top companies across Thailand</p>
      </section>

      <SearchBar
        search={searchInput}
        location={location}
        type={type}
        onSearchChange={setSearchInput}
        onLocationChange={setLocation}
        onTypeChange={setType}
      />

      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button className="pagination-btn" onClick={loadJobs} style={{ marginTop: '1rem' }}>
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="skeleton-grid">
          {Array.from({ length: limit }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-line w-40" />
              <div className="skeleton-line w-80 h-lg" />
              <div className="skeleton-line w-60" />
              <div className="skeleton-line w-full" style={{ marginTop: '1rem' }} />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔎</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </main>
  );
}
