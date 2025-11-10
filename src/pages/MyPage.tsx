import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log("유저 정보:", response);
        setData(response);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
        navigate("/");
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-20">
      <div className="flex flex-col gap-4 w-[300px] items-center">
        <div className="relative flex items-center justify-center py-2 w-full">
          <button
            className="absolute left-0 text-white text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src="https://icon-library.com/images/ios-back-icon/ios-back-icon-10.jpg"
              alt="뒤로가기"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-xl font-bold text-white">마이페이지</h1>
        </div>

        {/* 프로필 이미지 */}
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img
            src={
              data?.data.avatar
                ? data.data.avatar
                : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            className="w-full h-full object-cover bg-white"
            alt="프로필 이미지"
          />
        </div>

        {/* 이름 */}
        <div className="text-left w-full">
          <h2 className="text-sm text-gray-400 mb-1">이름</h2>
          <p className="text-white font-medium">{data?.data.name}</p>
        </div>

        {/* 이메일 */}
        <div className="text-left w-full">
          <h2 className="text-sm text-gray-400 mb-1">이메일</h2>
          <p className="text-white font-medium">{data?.data.email}</p>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-700 mt-4"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;