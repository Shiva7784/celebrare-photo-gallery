import React from 'react';
import PhotoCard from './PhotoCard';

export default function PhotoGrid({ photos, favourites, onToggleFavourite, searchTerm }) {
  if (photos.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-200">No photos found</h3>
        <p className="mt-1 text-sm text-slate-400">
          {searchTerm ? (
            <>No photos match the author name <span className="text-rose-400 font-medium">"{searchTerm}"</span>.</>
          ) : (
            'No photos available.'
          )}
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Photo Grid" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(String(photo.id))}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </div>
    </section>
  );
}
