import React from 'react';

const ErrorDisplay = ({ error, className = '', onRetry }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="text-red-500 text-center">
        <p className="text-lg font-medium mb-2">Error</p>
        <p className="text-sm">{error?.message || 'Something went wrong'}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-[#2363E3] text-white rounded hover:bg-[#1a4fb3] transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
