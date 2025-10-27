// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getToken: () => string | null;
  getRefreshToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    setIsAuthenticated(!!token);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  };

  const getRefreshToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};