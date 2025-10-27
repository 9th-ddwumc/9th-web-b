// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};