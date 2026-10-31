import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center" role="status">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 animate-ping" />
        <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-rose-500 animate-spin" />
      </div>
      <p className="mt-6 text-base font-medium text-slate-300">
        Fetching photos...
      </p>
    </div>
  );
}
