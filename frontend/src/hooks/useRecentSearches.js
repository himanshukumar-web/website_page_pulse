import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pagepulse-recent';
const MAX_RECENT = 5;

const useRecentSearches = () => {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setSearches(saved);
    } catch {
      setSearches([]);
    }
  }, []);

  const addSearch = (url) => {
    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== url);
      const updated = [url, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeSearch = (url) => {
    setSearches((prev) => {
      const updated = prev.filter((s) => s !== url);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearches([]);
  };

  return { searches, addSearch, removeSearch, clearAll };
};

export default useRecentSearches;
