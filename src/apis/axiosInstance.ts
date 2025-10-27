import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from './auth';

const API_BASE_URL = 'http://localhost:8000/v1/auth';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 중인지 추적하는 변수
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 요청 인터셉터: 모든 요청에 Access Token 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 반환
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 무한 루프 방지: _retry 플래그 설정
      originalRequest._retry = true;

      // 이미 토큰 갱신 중인 경우
      if (isRefreshing) {
        // 새로운 Promise를 반환하여 토큰 갱신 완료 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 토큰 갱신 시작
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // Refresh Token이 없으면 로그아웃 처리
        isRefreshing = false;
        processQueue(new Error('No refresh token available'), null);
        
        // 로컬 스토리지 클리어
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Refresh Token으로 새로운 Access Token 요청
        const response = await refreshAccessToken(refreshToken);

        if (response.success && response.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = response.data;

          // 새로운 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('user', JSON.stringify(user));

          // 대기 중인 요청들에 새로운 토큰 전달
          processQueue(null, newAccessToken);

          // 원래 요청에 새로운 토큰 설정
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // 토큰 갱신 완료
          isRefreshing = false;

          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        } else {
          // 토큰 갱신 실패
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 대기 중인 요청들 모두 거부
        processQueue(refreshError, null);
        isRefreshing = false;

        // 로컬 스토리지 클리어
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 401이 아니거나 이미 재시도한 경우 에러 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;