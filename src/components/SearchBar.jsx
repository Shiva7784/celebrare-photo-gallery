import React from 'react';

const SearchBar = React.memo(function SearchBar({
  searchTerm,
  onSearchChange,
  onClear,
  totalResults,
  totalPhotos,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search photos by author name..."
          className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 text-white placeholder-slate-400 text-sm md:text-base rounded-2xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-rose-500/80 focus:border-rose-500 transition-all shadow-lg backdrop-blur-sm"
          aria-label="Search photos by author"
        />

        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute right-16 p-1 text-slate-400 hover:text-white transition-colors"
            title="Clear search"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="absolute right-3.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 pointer-events-none">
          {totalResults}/{totalPhotos}
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
