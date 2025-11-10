import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1", // 백엔드 주소
  withCredentials: true,
});

// 요청 인터셉터: accessToken 자동 첨부
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: accessToken 만료 시 refreshToken으로 재발급 및 재요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Axios 인터셉터 에러 응답:", error.response); // 에러 응답 로깅

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("http://localhost:8000/v1/auth/refresh", { refreshToken }, { withCredentials: true });
        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        console.log("토큰 재발급 성공:", newAccessToken); // 토큰 재발급 성공 로그

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
