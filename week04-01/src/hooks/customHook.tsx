import { useState, useEffect } from "react";
import axios, { type AxiosRequestConfig } from "axios";

export function useCustomFetch<T>(
  endpoint: String,
  page: number = 1,
  config?: AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL =
    import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get<T>(
          `${TMDB_BASE_URL}${endpoint}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
            ...config,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("데이터 로딩 중 에러 발생: ", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [endpoint, page, TMDB_API_KEY, TMDB_BASE_URL]);

  return { data, isPending, isError };
}
