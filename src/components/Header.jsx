import React from 'react';

export default function Header({ favouritesCount = 0 }) {
  return (
    <header className="pt-8 pb-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium uppercase tracking-wider mb-3">
        <span>Frontend Internship Pre-Screening</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        Photo Gallery
      </h1>
      <p className="mt-2 text-sm md:text-base text-slate-400 max-w-lg mx-auto">
        Explore high-resolution curated photography from the Picsum API with real-time search and persistent favourites.
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
          <svg
            className={`w-4 h-4 ${favouritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
            viewBox="0 0 24 24"
            fill={favouritesCount > 0 ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={favouritesCount > 0 ? 0 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          {favouritesCount} {favouritesCount === 1 ? 'Favourite' : 'Favourites'} Saved
        </span>
      </div>
    </header>
  );
}
