import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간 후 value 반영
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업: value or delay 변경 → 기존 타이머 제거
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
