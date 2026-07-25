import { useState } from 'react';
import { analyzeUrl } from '../services/analyzeService';

const useAnalyze = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (url) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeUrl(url);
      setData(result);
      return result;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'An unexpected error occurred';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, analyze, reset };
};

export default useAnalyze;
