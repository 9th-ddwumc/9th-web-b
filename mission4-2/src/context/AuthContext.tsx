import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  login: (token: string, refreshToken: string, userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  const login = (token: string, refreshToken: string, userName: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userName", userName);
    setIsLoggedIn(true);
    setUserName(userName);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName(null);
  };

  useEffect(() => {
    // 다른 탭(localStorage 변경 시)과 상태 동기화
    const syncState = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
      setUserName(localStorage.getItem("userName"));
    };
    window.addEventListener("storage", syncState);
    return () => window.removeEventListener("storage", syncState);
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  return context;
};
