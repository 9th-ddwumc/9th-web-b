//Axios 인스턴스 및 인터셉터

import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true, //쿠키 사용 시
});

//요청 인터셉터 : 모든 요청에 토큰 심기
axiosInstance.interceptors.request.use(
  (config) => {
    //훅을 활용하여 로컬스토리지에서 토큰을 가져옴
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const token = getItem();
    if (token) {
      //토큰이 있을 경우 헤더에 Authorization 추가
      config.headers.Authorization = `Bearer ${token};`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
