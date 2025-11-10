import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

type UserType = {
  name: string;
  bio: string;
  email: string;
  avatar: string;
};

function MyPage() {
  const [data, setData] = useState<UserType | null>(null);
  const [inputValues, setInputValues] = useState<UserType>({
    name: "",
    bio: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // 프로필 데이터 불러오기
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.data);
    } catch (error) {
      setError("프로필 정보를 불러올 수 없습니다.");
      console.error("API 호출 실패", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) setInputValues(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장 및 정보 새로고침
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveError("");
    try {
      await axiosInstance.patch(
        "/users",
        {
          name: inputValues.name,
          bio: inputValues.bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("저장되었습니다!");
      fetchData();
    } catch (error) {
      setSaveError("저장 중 에러가 발생했습니다.");
      console.error("저장 실패", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-16 text-white">
      <div className="w-48 h-48 rounded-full bg-neutral-800 flex items-center justify-center mb-8 overflow-hidden">
        {data?.avatar ? (
          <img src={data.avatar} alt="프로필 사진" className="object-cover w-full h-full rounded-full" />
        ) : (
          // 기본 아이콘 (사진 없을 때)
          <svg width="130" height="130" viewBox="0 0 24 24" fill="#ddd">
            <circle cx="12" cy="8" r="5" />
            <ellipse cx="12" cy="17" rx="8" ry="5" />
          </svg>
        )}
      </div>
      <div className="w-[350px] max-w-[90vw] text-center">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            className="w-full bg-black border-2 border-white rounded-xl py-4 px-6 text-2xl font-bold text-white focus:outline-pink-500"
            placeholder="이름"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="bio"
            value={inputValues.bio}
            onChange={handleChange}
            className="w-full bg-black border-2 border-white rounded-xl py-3 px-5 text-lg text-white focus:outline-pink-500"
            placeholder="상태 메시지"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={inputValues.email}
            readOnly
            className="w-full bg-black border-2 border-white rounded-xl py-3 px-5 text-lg text-neutral-400 cursor-not-allowed"
            placeholder="이메일"
          />
        </div>
        <button
          onClick={handleSave}
          className={`w-full mt-2 py-3 bg-pink-500 text-white rounded-lg font-bold text-lg hover:bg-pink-600 transition ${saveLoading ? "opacity-60 cursor-wait" : ""}`}
          disabled={saveLoading}
        >
          {saveLoading ? "저장중..." : "저장"}
        </button>
        {saveError && <div className="mt-2 text-red-400">{saveError}</div>}
        <button onClick={handleLogout} className="w-full mt-4 py-3 bg-neutral-700 text-white rounded-lg font-bold text-lg hover:bg-neutral-600 transition">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyPage;
