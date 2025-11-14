import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { UserInfo } from "../types/auth.dto";
import { getMyInfo } from "../apis/auth";
import { useMutation } from "@tanstack/react-query";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // ✅ 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      alert("👋 로그아웃 되었습니다.");
      window.location.href = "/login";
    },
    onError: (err) => {
      console.error("❌ 로그아웃 오류:", err);
      alert("로그아웃 중 문제가 발생했습니다.");
    },
  });

  useEffect(() => {
    if (!accessToken) {
      setUserInfo(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
        setUserInfo(null);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <nav className="bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-pink-600 ml-10">
          돌려돌려 돌림판
        </Link>

        <div className="space-x-6 flex items-center">
          {!accessToken ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-blue-500">
                로그인
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-blue-500">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to="/my" className="text-gray-300 hover:text-blue-500">
                {userInfo ? `${userInfo.name}님 반갑습니다` : "로딩 중..."}
              </Link>
              <Link to="/search" className="text-gray-300 hover:text-blue-500">
                검색
              </Link>
              <button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="text-gray-300 hover:text-red-500 font-semibold"
              >
                {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
