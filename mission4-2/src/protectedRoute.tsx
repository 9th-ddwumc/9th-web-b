import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("accessToken"); // 인증 토큰(구현 상황에 맞게 조정)
  const location = useLocation();

  if (!token) {
    // 로그인 안 된 상태: 로그인 페이지로 이동, 방문 위치 정보 넘김
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 인증 되면 컨텐츠 그대로 출력
  return <>{children}</>;
};

export default ProtectedRoute;
