// src/9th-web-b/components/LoadingSpinner.tsx
import React, { memo } from 'react';

const LoadingSpinner: React.FC = memo(() => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;