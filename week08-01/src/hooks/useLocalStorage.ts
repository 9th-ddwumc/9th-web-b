import { LOCAL_STORAGE_KEYS } from "../constants/key";

/** LOCAL_STORAGE_KEYS("accessToken" | "refreshToken") 타입만 허용 */
type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

/** 타입 안전한 로컬스토리지 훅 (제네릭 기반) */
export const useLocalStorage = <T = string>(key: LocalStorageKey) => {
  /** 저장 */
  const setItem = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`❌ localStorage setItem 실패 (${key}):`, error);
    }
  };

  /** 조회 */
  const getItem = (): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`❌ localStorage getItem 실패 (${key}):`, error);
      return null;
    }
  };

  /** 삭제 */
  const removeItem = (): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`❌ localStorage removeItem 실패 (${key}):`, error);
    }
  };

  return { setItem, getItem, removeItem };
};
