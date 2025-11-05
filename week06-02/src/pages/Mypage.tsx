import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { UserInfo } from "../types/auth.dto";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { logout } = useAuth();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setUserInfo(response.data);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>{userInfo?.name}님 환영합니다.</h1>
      <img src={userInfo?.avatar as string} alt={"구글로고"} />
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
