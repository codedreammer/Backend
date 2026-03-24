const STORAGE_KEY = "job-portal-favorites";

export const getStoredFavorites = () => {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.error("Unable to read favorites from local storage", error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Unable to save favorites to local storage", error);
  }
};
