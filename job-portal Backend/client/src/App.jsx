import { Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddJobPage from "./pages/AddJobPage";
import { getJobs } from "./services/jobsApi";
import { getStoredFavorites, saveFavorites } from "./services/favoritesStorage";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const normalizedSearch = useMemo(() => searchTerm.trim(), [searchTerm]);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await getJobs(normalizedSearch);

        if (isMounted) {
          setJobs(data);
        }
      } catch (error) {
        console.error("Unable to load jobs", error);
        if (isMounted) {
          setJobs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [normalizedSearch]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = (jobId) => favorites.some((job) => job._id === jobId);

  const toggleFavorite = (job) => {
    setFavorites((current) => {
      const exists = current.some((item) => item._id === job._id);
      if (exists) {
        return current.filter((item) => item._id !== job._id);
      }
      return [job, ...current];
    });
  };

  const removeFavorite = (jobId) => {
    setFavorites((current) => current.filter((job) => job._id !== jobId));
  };

  const addCreatedJob = (job) => {
    setJobs((current) => [job, ...current.filter((item) => item._id !== job._id)]);
  };

  return (
    <div className="app-shell">
      <Navbar favoritesCount={favorites.length} />
      <main className="page-shell">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                jobs={jobs}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/jobs"
            element={
              <JobsPage
                jobs={jobs}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/jobs/:jobId"
            element={
              <JobDetailsPage
                jobs={jobs}
                loading={loading}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/add-job"
            element={
              <AddJobPage
                onJobCreated={addCreatedJob}
                setSearchTerm={setSearchTerm}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
