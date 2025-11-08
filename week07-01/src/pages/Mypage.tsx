import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { patchMyProfile } from "../apis/user";
import axiosInstance from "../apis/axios";

const Mypage = () => {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [avatar, setAvatar] = useState<string | File | null>(
    user?.avatar ?? null
  );
  const [preview, setPreview] = useState<string | null>(user?.avatar ?? null);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setBio(user.bio ?? "");
      setAvatar(user.avatar ?? null);
      setPreview(user.avatar ?? null);
    }
  }, [user]);

  const updateProfile = useMutation({
    mutationFn: async () => {
      let avatarToSend: string | null = null;

      if (typeof avatar === "string") {
        avatarToSend = avatar;
      } else if (avatar instanceof File) {
        console.warn("⚠️ 현재 서버는 File 업로드를 지원하지 않습니다.");
        avatarToSend = null;
      }

      return patchMyProfile({ name, bio, avatar: avatarToSend });
    },
    onSuccess: async () => {
      alert("✅ 프로필 수정 성공!");

      try {
        const { data } = await axiosInstance.get("/v1/users/me");
        if (data?.data) {
          setUser(data.data);
          setName(data.data.name || "");
          setBio(data.data.bio || "");
          setAvatar(data.data.avatar || null);
          setPreview(data.data.avatar || null);
        }
      } catch (err) {
        console.error("갱신 정보 불러오기 실패:", err);
      }

      setIsEditing(false);
    },
    onError: (err) => {
      console.error("❌ 프로필 수정 오류:", err);
      alert("프로필 수정 실패 ❌");
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    if (!name.trim()) return alert("이름은 필수입니다!");
    updateProfile.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1624] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>

      <div className="relative bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col items-center w-[340px]">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="absolute top-4 right-4 text-2xl hover:text-pink-400 transition"
        >
          ⚙️
        </button>

        <label className="relative cursor-pointer">
          <img
            src={preview ?? "/images/default-profile.png"}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          )}
        </label>

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-4 text-xl font-semibold text-center bg-gray-800 rounded p-1"
          />
        ) : (
          <p className="mt-4 text-xl font-semibold text-pink-400">
            {user?.name || "이름 없음"}
          </p>
        )}

        <p className="text-gray-400 text-sm mt-1">
          {user?.email || "이메일 정보 없음"}
        </p>

        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
            className="mt-3 w-full bg-gray-800 rounded p-2 text-center text-sm"
          />
        ) : (
          <p className="mt-3 text-sm text-gray-300 italic">
            {user?.bio || "자기소개를 추가해보세요 ✨"}
          </p>
        )}

        {isEditing && (
          <button
            onClick={handleSaveProfile}
            disabled={updateProfile.isPending}
            className="mt-4 w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-md font-semibold"
          >
            {updateProfile.isPending ? "저장 중..." : "저장"}
          </button>
        )}

        <button
          onClick={logout}
          className="mt-6 w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-md font-semibold"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Mypage;
