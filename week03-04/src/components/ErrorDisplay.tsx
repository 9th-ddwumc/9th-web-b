import React from 'react';

interface ErrorDisplayProps {
  message?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message = "에러가 발생했습니다." }) => {
  return (
    <div className="text-red-500 font-bold text-2xl flex items-center justify-center h-screen">
      {message}
    </div>
  );
};