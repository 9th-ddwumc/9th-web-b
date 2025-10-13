import { useEffect, useState } from 'react';
import axios from 'axios';

interface UseCustomFetchOptions {
  url: string;
  params?: Record<string, string | number>;
  enabled?: boolean;
}

interface UseCustomFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCustomFetch<T>({
  url,
  params = {},
  enabled = true,
}: UseCustomFetchOptions): UseCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_TMDB_KEY;

      if (!apiKey) {
        throw new Error('API 키가 설정되지 않았습니다.');
      }

      // URL 파라미터 생성
      const queryParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString();

      const fullUrl = `https://api.themoviedb.org/3/${url}${
        queryParams ? `?${queryParams}` : ''
      }`;

      const response = await axios.get<T>(fullUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      setData(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? `데이터를 불러오는데 실패했습니다. (${
            err.response?.status || '네트워크 오류'
          })`
        : '데이터를 불러오는데 실패했습니다.';

      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [url, JSON.stringify(params), enabled]);

  return { data, isLoading, error, refetch: fetchData };
}