import { useLocation, useNavigate } from "react-router-dom";

const SignupCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "이름 없음";

  return (
    <>
      {/* 본문 */}
      <div className="flex flex-col items-center justify-center mt-10">
        {/* 아바타 이미지 */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="avatar"
          className="w-28 h-28 rounded-full bg-white"
        />

        {/* 이름 */}
        <p className="mt-6 text-xl font-semibold">{name}</p>

        {/* 버튼 */}
        <button
          className="mt-8 px-6 py-3 bg-pink-400 text-white rounded-md hover:bg-pink-600 transition"
          onClick={() => navigate("/")}
        >
          회원가입 완료
        </button>
      </div>
    </>
  );
};

export default SignupCompletePage;