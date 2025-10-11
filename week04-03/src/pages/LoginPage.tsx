import type React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { type UserSignInInformation, validateSignIn } from "../utils/validator";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants";

const LoginPage: React.FC = () => {
  // 뒤로가기용 navigate
  const navigate = useNavigate();

  // 토큰 저장용 훅
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  // 1️⃣ useForm 훅 사용
  const { values, errors, touched, getInputProps } =
    useForm<UserSignInInformation>({
      initalValue: {
        email: "",
        password: "",
      },
      validate: validateSignIn,
    });

  // 2️⃣ 버튼 비활성화 로직
  const isButtonDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  // 3️⃣ 폼 제출 핸들러
  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      const accessToken = response.data.accessToken;

      // accessToken을 로컬스토리지에 저장
      setItem(accessToken);

      // 로그인 성공 후 페이지 이동
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패: ", error);
    }
  };

  // 4️⃣ 렌더링
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-dvh bg-gray-200">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between w-[300px] p-[10px] border-transparent">
        <div className="flex-1 text-left" onClick={() => navigate(-1)}>
          <span className="cursor-pointer">⏮</span>
        </div>
        <div className="flex-1 text-center">로그인</div>
        <div className="flex-1"></div>
      </div>

      {/* 로그인 폼 */}
      <div className="flex flex-col gap-3">
        <div className="text-center border border-black w-[300px] p-[10px] rounded-sm">
          구글 로그인
        </div>
        <p className="text-center">-------------OR-------------</p>

        {/* 이메일 */}
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            touched?.email && errors?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        {/* 비밀번호 */}
        <input
          {...getInputProps("password")}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            touched?.password && errors?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {/* 버튼 */}
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
