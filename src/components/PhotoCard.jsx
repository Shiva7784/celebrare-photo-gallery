import React, { useState } from 'react';

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const thumbnailSrc = `https://picsum.photos/id/${photo.id}/600/450`;

  return (
    <article className="group relative bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20 flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
        )}

        {imageError ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            Image unavailable
          </div>
        ) : (
          <img
            src={thumbnailSrc}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />
        )}

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${isFavourite
              ? 'bg-rose-500/90 text-white hover:bg-rose-600 scale-100 hover:scale-110 active:scale-90'
              : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/70 hover:scale-110 active:scale-90'
            }`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isFavourite ? 'scale-105' : ''}`}
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? 0 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex items-center justify-between gap-3 bg-gradient-to-b from-transparent to-slate-900/60">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Author</p>
          <h2 className="text-sm md:text-base font-semibold text-slate-100 truncate" title={photo.author}>
            {photo.author}
          </h2>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}
