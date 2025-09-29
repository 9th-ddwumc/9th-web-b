import { useState, useEffect } from 'react';
import { getCurrentPath } from './utils';

export function useCurrentPath(): string {
  const [path, setPath] = useState(() => getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return path;
}
