import { LOCAL_STORAGE_KEYS } from "../constants";

// ✅ LOCAL_STORAGE_KEYS의 value("accessToken") 타입을 허용하도록 변경
type LocalStorageValue =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

// ✅ 로컬스토리지 훅
export const useLocalStorage = (key: LocalStorageValue) => {
  //값 저장 (JSON.stringify 사용)
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage item: ", error);
    }
  };

  //값 조회 (JSON.parse 사용)
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting local storage item: ", error);
      return null;
    }
  };

  //값 제거
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing local storage item: ", error);
    }
  };

  return { setItem, getItem, removeItem };
};
