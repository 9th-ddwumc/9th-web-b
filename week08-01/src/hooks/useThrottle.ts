import { useEffect, useRef, useState } from "react";

// value: 감시할 값
// interval: 몇 ms마다 한 번만 업데이트할지
export function useThrottle<T>(value: T, interval = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 마지막 실행 시간을 저장
  const lastExecuted = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();

    // interval 이내인데 value가 바뀌면 → 무시
    if (now - lastExecuted.current < interval) return;

    // interval 이상 지났으면 업데이트
    lastExecuted.current = now;
    setThrottledValue(value);

    // cleanup 필요 없음 (타이머 안 쓰는 방식)
  }, [value, interval]);

  return throttledValue;
}
