import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading pipeline data...' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className={`${sizes[size]} border-slate-800 rounded-full`}></div>
        <div className={`${sizes[size]} border-t-indigo-500 rounded-full animate-spin absolute top-0 left-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]`}></div>
      </div>
      {message && <p className="mt-4 text-slate-400 text-sm font-medium animate-pulse">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
