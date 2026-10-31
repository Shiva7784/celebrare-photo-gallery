import { useState, useEffect } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos(url = PICSUM_API_URL) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load photos (Status: ${response.status})`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred while fetching photos.');
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [url]);

  return { photos, loading, error };
}
