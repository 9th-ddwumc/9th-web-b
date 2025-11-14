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

      if (typeof avatar === "string") avatarToSend = avatar;
      else if (avatar instanceof File) {
        console.warn("⚠️ 현재 서버는 File 업로드를 지원하지 않습니다.");
        avatarToSend = null;
      }

      return patchMyProfile({ name, bio, avatar: avatarToSend });
    },

    onMutate: async () => {
      if (user) {
        const updatedUser = {
          ...user,
          name,
          bio,
          avatar: preview ?? user.avatar,
          updatedAt: new Date(),
        };
        setUser(updatedUser);
      }
    },

    onSuccess: () => setIsEditing(false),

    onError: (err) => {
      console.error("❌ 프로필 수정 오류:", err);
      alert("프로필 수정 실패 ❌");
      if (user) setUser(user);
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
    <div className="flex flex-col items-center min-h-screen bg-[#0f1624] text-white pt-24 pb-20">
      {/* 프로필 카드 */}
      <div className="relative bg-gray-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-8 w-[90%] max-w-[500px] border border-gray-700 transition-all duration-300 hover:shadow-pink-500/20">
        {/* 수정 / 저장 버튼 */}
        <button
          onClick={() => {
            if (isEditing) handleSaveProfile();
            else setIsEditing(true);
          }}
          className={`absolute top-4 right-4 text-2xl transition ${
            isEditing
              ? "text-green-400 hover:text-green-500"
              : "hover:text-pink-400"
          }`}
          title={isEditing ? "저장하기" : "프로필 수정"}
        >
          {isEditing ? "✅" : "⚙️"}
        </button>

        {/* 프로필 이미지 */}
        <label className="relative cursor-pointer">
          <img
            src={preview ?? "/images/default-profile.png"}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover shadow-lg"
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

        {/* 오른쪽 정보 영역 */}
        <div className="flex flex-col flex-1 text-left justify-center py-4">
          {/* 이름 */}
          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-3xl font-semibold bg-gray-800 rounded-md p-2 mb-1 w-[80%] h-[44px] leading-[44px] focus:outline-none text-pink-300"
            />
          ) : (
            <p className="text-3xl font-semibold text-pink-400 h-[44px] leading-[44px]">
              {user?.name || "이름 없음"}
            </p>
          )}
          {/* 자기소개 */}
          {isEditing ? (
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요"
              className="w-full bg-gray-800 rounded-md p-2 text-md leading-[22px] focus:outline-none resize-none"
            />
          ) : (
            <p className="text-md text-gray-300 italic min-h-[20px] leading-[22px]">
              {user?.bio || "자기소개를 추가해보세요 ✨"}
            </p>
          )}
          {/* 이메일 */}
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* LP 목록 섹션 */}
      <section className="w-full max-w-5xl mt-16 px-6">
        <hr className=" border-gray-700" />
        <div className="flex mb-20 justify-center">
          <span className="text-xl font-semibold text-center border-t border-white pt-4 px-4">
            내가 좋아요 한 LP
          </span>
          <span className="text-xl font-semibold text-center text-gray-400 border-t border-gray-700 pt-4 px-4 hover:text-white hover:border-pink-500 transition-all duration-200">
            내가 작성한 LP
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center">
          {/* 예시용 카드 */}
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 overflow-hidden shadow-md hover:shadow-pink-500/20 transition-all duration-200"
            >
              <img
                src="public\images\default-thumbnail.jpg"
                alt="LP"
                className="w-40 h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Mypage;
