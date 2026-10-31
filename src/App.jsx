import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PhotoGrid from './components/PhotoGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  FAVOURITES_ACTIONS,
  LOCAL_STORAGE_KEY,
} from './reducers/favouritesReducer';

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  console.log(photos);
  const [searchTerm, setSearchTerm] = useState('');

  // Manage favourites state with useReducer, reading initial state from localStorage
  const [favourites, dispatchFavourites] = useReducer(
    favouritesReducer,
    [],
    initFavourites
  );

  // Persist favourites to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favourites]);

  // useCallback prevents re-creating function reference on every render
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // useMemo caches filtered results and recomputes only when photos or searchTerm changes
  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) {
      return photos;
    }
    const query = searchTerm.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatchFavourites({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full flex-1">
        <Header favouritesCount={favourites.length} />

        {!error && (
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClear={handleClearSearch}
            totalResults={filteredPhotos.length}
            totalPhotos={photos.length}
          />
        )}

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <PhotoGrid
            photos={filteredPhotos}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            searchTerm={searchTerm}
          />
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Celebrare Frontend Internship Assignment • React + Vite + Tailwind CSS
      </footer>
    </div>
  );
}
