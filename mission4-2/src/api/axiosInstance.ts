import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/v1",
  withCredentials: true,
});

// Request: 자동 Authorization 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: 자동 토큰 재발급
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 로그아웃 API는 재발급 제외
    if (originalRequest.url.includes("/auth/signout")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("http://localhost:8000/v1/auth/refresh", { refreshToken }, { withCredentials: true });

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
