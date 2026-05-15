import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling API calls with loading, error, and data states.
 * Supports polling for real-time updates.
 */
export const useApi = (apiFunc, params = null, pollingInterval = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await apiFunc(params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunc, params]);

  useEffect(() => {
    fetchData();

    if (pollingInterval > 0) {
      const interval = setInterval(fetchData, pollingInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, pollingInterval]);

  return { data, loading, error, refetch: fetchData };
};
