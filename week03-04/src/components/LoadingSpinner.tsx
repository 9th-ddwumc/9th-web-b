import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-12 h-12 animate-spin rounded-full border-4 border-solid border-bedaB1 border-t-transparent"
        role="status"
        aria-label="로딩 중"
      >
        <span className="sr-only">로딩 중</span>
      </div>
    </div>
  );
};