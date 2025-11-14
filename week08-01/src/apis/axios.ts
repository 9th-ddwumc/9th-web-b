//Axios 인스턴스 및 인터셉터

import axios, { type InternalAxiosRequestConfig } from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

let refreshPromise: Promise<string> | null = null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true, //쿠키 사용 시
});

//요청 인터셉터 : 모든 요청 전에 accessToken을 Authorization헤더에 추가한다.
axiosInstance.interceptors.request.use(
  (config) => {
    //훅을 활용하여 로컬스토리지에서 토큰을 가져옴
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const accessToken = getItem();
    if (accessToken) {
      //토큰이 있을 경우 헤더에 Authorization 헤더에 Bearer 토큰 형식으로 추가
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers = config.headers || {};
    }
    //수정 된 요청 설정을 반환
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답 인터셉터: 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401에러가 발생한 경우(unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      //재시도 플래그 설정
      originalRequest._retry = true;

      //이미 리프레시 요청이 진행중이면, 그 Promise를 재사용합니다.
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEYS.REFRESH_TOKEN
          );
          const refreshToken = getRefreshToken();
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEYS.ACCESS_TOKEN
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEYS.REFRESH_TOKEN
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          //새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEYS.ACCESS_TOKEN
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEYS.REFRESH_TOKEN
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      //진행중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer${newAccessToken}`;
        //업데이트 된 원본 요청을 재시도 합니다.
        return axiosInstance.request(originalRequest);
      });
    }
    //401에러가 아닌 경우에 그대로 오류를 반환
    return Promise.reject(error);
  }
);
export default axiosInstance;
