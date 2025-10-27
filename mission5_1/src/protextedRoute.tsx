import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  userInfo: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userInfo }) => {
  if (!userInfo) {
    // 유저 정보가 없다면 홈으로! 혹은 로그인페이지로 가게 할 수 있음
    return <Navigate to="/" replace={true} />;
  }

  // 유저 정보가 있다면 자식 컴포넌트를 보여줌
  return <Outlet />;
};

export default ProtectedRoute;
