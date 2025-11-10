import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

type UserType = {
  name: string;
  bio: string;
  email: string;
  avatar: string | null;
};

// 유저 정보 가져오기 API
const fetchUser = async (token: string | null) => {
  const res = await axiosInstance.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

// 유저 정보 수정 API
const updateUser = async ({ token, name, bio }: { token: string | null; name: string; bio: string }) => {
  const res = await axiosInstance.patch("/users", { name, bio }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.data;
};

function MyPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();

  // 유저 정보 조회 (React Query)
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: () => fetchUser(token),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inputValues, setInputValues] = useState({ name: "", bio: "" });

  useEffect(() => {
    if (user) setInputValues({ name: user.name, bio: user.bio || "" });
  }, [user]);

  // 낙관적 업데이트(Optimistic Update)
  const mutation = useMutation({
    mutationFn: updateUser,
    onMutate: async (updated) => {
      // 기존 데이터 백업
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const previousUser = queryClient.getQueryData<UserType>(["user"]);

      // 낙관적 업데이트: UI 즉시 변경
      queryClient.setQueryData<UserType>(["user"], (old) => (old ? { ...old, name: updated.name, bio: updated.bio } : old));

      return { previousUser };
    },
    onError: (err, newUser, context) => {
      // 실패 시 롤백
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }
      alert("저장 중 오류가 발생했습니다.");
    },
    onSettled: () => {
      // 성공 or 실패 후 최신화
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSave = () => {
    mutation.mutate({
      token,
      name: inputValues.name,
      bio: inputValues.bio,
    });
    setIsEditing(false); // UI 즉시 닫힘
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (isLoading) return <div className="text-white text-center mt-20">로딩 중...</div>;
  if (isError || !user) return <div className="text-red-500 text-center mt-20">오류가 발생했습니다.</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16">
      <div className="flex flex-col items-center relative">
        {/* 프로필 이미지 */}
        <div className="w-40 h-40 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt="프로필" className="object-cover w-full h-full" />
          ) : (
            <svg width="100" height="100" viewBox="0 0 24 24" fill="#ffffff">
              <circle cx="12" cy="8" r="5" />
              <ellipse cx="12" cy="17" rx="8" ry="5" />
            </svg>
          )}
        </div>

        {/* 설정 버튼 */}
        <button onClick={() => setIsEditing((prev) => !prev)} className="absolute top-2 right-[-50px] hover:text-pink-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 4.6V4a2 2 0 1 1 4 0v.09c0 .69.39 1.31 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c.2.61.82 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {/* 인라인 수정 */}
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              className="text-2xl font-bold text-center bg-transparent border-b border-gray-500 focus:outline-none mt-4"
            />
            <input
              type="text"
              name="bio"
              value={inputValues.bio}
              onChange={handleChange}
              className="text-neutral-300 text-center bg-transparent border-b border-gray-500 focus:outline-none mt-2"
              placeholder="상태 메시지 입력"
            />
            <button
              onClick={handleSave}
              disabled={mutation.isPending}
              className={`mt-4 px-6 py-2 rounded-lg font-bold text-lg ${mutation.isPending ? "bg-pink-400 cursor-wait" : "bg-pink-500 hover:bg-pink-600 transition"}`}
            >
              {mutation.isPending ? "저장중..." : "저장"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="text-neutral-400 mt-2">{user.bio || "상태 메시지를 입력해주세요"}</p>
          </>
        )}
        <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
      </div>

      <div className="w-full h-[1px] bg-neutral-800 my-6" />

      <button onClick={handleLogout} className="mt-8 text-neutral-500 hover:text-pink-400 text-sm underline">
        로그아웃
      </button>
    </div>
  );
}

export default MyPage;
