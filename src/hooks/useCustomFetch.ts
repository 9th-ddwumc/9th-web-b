import { useQuery } from "@tanstack/react-query";

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    },
    retry: 3,
    retryDelay: (attemptIndex) =>
      Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    staleTime: 5 * 60 * 1000,    // 5분
    gcTime: 10 * 60 * 1000,       // 10분
  });
};