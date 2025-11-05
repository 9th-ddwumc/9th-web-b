import { data, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { id } from "zod/locales";
import { useEffect, useState } from "react";
import type { UserInfo } from "../types/auth.dto";
import { getMyInfo } from "../apis/auth";

const Navbar = () => {
  const { accessToken } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setUserInfo(response.data);
    };
    getData();
  }, []);
  return (
    <nav className="bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-pink-600 ml-10">
          돌려돌려 돌림판
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link to={"/login"} className="text-gray-300 hover:text-blue-500">
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <>
              <Link to={"/my"} className="text-gray-300 hover:text-blue-500">
                {userInfo?.name}님 반갑습니다
              </Link>
              <Link
                to={"/search"}
                className="text-gray-300 hover:text-blue-500"
              >
                검색
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
