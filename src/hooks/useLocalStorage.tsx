export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // 문자열이면 그대로, 객체면 JSON.stringify
      const valueToStore = typeof value === 'string' 
        ? value 
        : JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};