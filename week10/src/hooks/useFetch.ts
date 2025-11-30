import { useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import axiosClient from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await axiosClient.get<T>(url, {
          ...options,
        });

        setData(response.data);
      } catch (err) {
        setError("데이터를 가져오는데 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
