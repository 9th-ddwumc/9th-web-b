import { useEffect, useState } from "react";
import axios from "axios";

interface UseFetchOptions {
  enabled?: boolean; // false면 자동 실행 안 함
  headers?: Record<string, string>;
  params?: Record<string, any>;
  method?: string;
}

interface UseFetchReturn<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCustomFetch<T>(
  url: string | null,
  options?: UseFetchOptions
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const { enabled = true, headers, params, method = "GET" } = options || {};

  useEffect(() => {
    if (!url || !enabled) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            ...headers,
          },
          params,
        });
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, enabled, refetchKey, headers, params, method]); // url이나 enabled 변경 시 재호출

  const refetch = () => setRefetchKey((prev) => prev + 1);

  return { data, isPending, isError, error, refetch };
}