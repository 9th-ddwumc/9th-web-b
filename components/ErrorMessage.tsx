// src/9th-web-b/components/ErrorMessage.tsx
import React, { memo } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = memo(({ message }) => {
  return (
    <div className="error-message">
      <p>⚠️ {message}</p>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;