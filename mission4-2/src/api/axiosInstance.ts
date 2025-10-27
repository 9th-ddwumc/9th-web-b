import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1", // NestJS 백엔드 주소 (포트 맞게 수정)
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
