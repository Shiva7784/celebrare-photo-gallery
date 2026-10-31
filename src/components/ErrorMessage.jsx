import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="max-w-md mx-auto my-16 p-6 rounded-2xl bg-rose-950/30 border border-rose-800/50 text-center shadow-xl">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-rose-200">Unable to Load Photos</h3>
      <p className="mt-2 text-sm text-rose-300/80">
        {message || 'Failed to fetch photos. Please check your internet connection.'}
      </p>
    </div>
  );
}
