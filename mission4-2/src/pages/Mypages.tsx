import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function MyPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        setData(response.data);
      } catch (error) {
        console.error("API 호출 실패", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div>
      {data ? JSON.stringify(data) : "데이터 로딩 중..."}
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        로그아웃
      </button>
    </div>
  );
}

export default MyPage;
