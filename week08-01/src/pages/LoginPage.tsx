import type React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { type UserSignInInformation, validateSignIn } from "../utils/validator";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [navigate, accessToken]);

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const { values, errors, touched, getInputProps } =
    useForm<UserSignInInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignIn,
    });

  const isButtonDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  const handleSubmit = async () => {
    await login(values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between w-[320px] mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition"
        >
          ⏮
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">로그인</h1>
        <div className="w-6" />
      </div>

      {/* 로그인 박스 */}
      <div className="flex flex-col gap-3 bg-gray-800 p-6 rounded-xl shadow-md w-[320px]">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-gray-400 rounded-md py-2 hover:bg-gray-700 transition"
        >
          <img src="/images/google.svg" alt="구글 로고" className="w-5 h-5" />
          <span>Google 로그인</span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-gray-400 text-xs">또는</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* 이메일 */}
        <input
          {...getInputProps("email")}
          type="email"
          placeholder="이메일을 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            touched?.email && errors?.email
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors?.email && touched?.email && (
          <p className="text-red-400 text-sm">{errors.email}</p>
        )}

        {/* 비밀번호 */}
        <input
          {...getInputProps("password")}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            touched?.password && errors?.password
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors?.password && touched?.password && (
          <p className="text-red-400 text-sm">{errors.password}</p>
        )}

        {/* 로그인 버튼 */}
        <button
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md mt-2 transition disabled:bg-gray-500"
        >
          로그인
        </button>

        {/* 하단 회원가입 링크 */}
        <p className="text-center text-gray-400 text-sm mt-2">
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-400 hover:underline cursor-pointer"
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
