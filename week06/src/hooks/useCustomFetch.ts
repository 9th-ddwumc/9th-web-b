import { useEffect, useMemo, useState, useRef } from "react";

// 최대 재시도 횟수
const MAX_RETRIES = 3;
// 초기 재시도 지연 시간
const INITIAL_RETRY_DELAY = 1000;
const STALE_TIME = 5 * 60 * 1000; // 5분

// 로컬 스토리지에 저장될 캐시 데이터의 구조
interface CacheEntry<T> {
  data: T; // 실제 서버 데이터
  lastFetched: number; // 마지막으로 데이터를 가져온 시점
}

export const useCustomFetch = <T>(url: string) => {
  // 서버에서 가져온 데이터를 저장하는 상태
  const [data, setData] = useState<T | null>(null);
  // 데이터 로딩 중 여부를 나타내는 상태
  const [isPending, setIsPending] = useState<boolean>(false);
  // 에러 발생 여부를 나타내는 상태
  const [isError, setIsError] = useState<boolean>(false);

  // URL을 localStorage 키로 사용
  const storageKey = useMemo(() => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 새로운 요청을 위한 AbortController 생성
    abortControllerRef.current = new AbortController();
    setIsError(false);

    // currentRetry: 현재까지 재시도한 횟수 (기본값 0)
    const fetchData = async (currentRetry = 0) => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      // 1. 캐시 확인 로직
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          // 캐시가 신선한 경우 네트워크 요청 생략
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            return;
          }

          // 캐시가 오래된 경우 먼저 보여주고 백그라운드에서 새 데이터 가져오기
          setData(cachedData.data);
        } catch {
          // 손상된 캐시 제거
          localStorage.removeItem(storageKey);
        }
      }

      // 2. 네트워크 요청
      setIsPending(true);

      try {
        // signal을 전달하여 요청 취소 가능하게 설정
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }

        const newData: T = await response.json();
        setData(newData);

        // 캐시에 새 데이터 저장
        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
        setIsPending(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("[Fetch Cancelled] Request cancelled.");
          return;
        }

        // 3. 재시도 로직
        if (currentRetry < MAX_RETRIES) {
          // 지수 백오프
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(`[Retry ${currentRetry + 1}/${MAX_RETRIES}] Retrying in ${retryDelay}ms...`);

          // 지연 후 재귀적으로 fetchData 호출
          retryTimeoutRef.current = window.setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          // 최대 재시도 횟수 초과 시 최종 에러 처리
          setIsError(true);
          setIsPending(false);
          console.error(`[Fetch Failed] Maximum retries (${MAX_RETRIES}) exceeded:`, error);
        }
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();

      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};
