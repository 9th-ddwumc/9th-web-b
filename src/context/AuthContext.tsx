// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

import type { RequestSigninDto, ResponseMyInfoDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: ResponseMyInfoDto | null;
  // setUser: (user: ResponseMyInfoDto | null) => void;
  setUser: React.Dispatch<React.SetStateAction<ResponseMyInfoDto | null>>;

  login: (siginData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState(getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState(
    getRefreshTokenFromStorage()
  );
  const [user, setUser] = useState<ResponseMyInfoDto | null>(null);

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        setAccessTokenInStorage(data.accessToken);
        setRefreshTokenInStorage(data.refreshToken);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        const userInfo = await getMyInfo();
        setUser(userInfo);

        alert("로그인 성공");
        window.location.href = "/mypage";
      }
    } catch (error) {
      console.log("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다");
  }
  return context;
};