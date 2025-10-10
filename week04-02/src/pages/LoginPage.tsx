import type React from "react";
import useForm from "../hooks/useForm";
import { type UserSignInInformation, validateSignIn } from "../utils/validator";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  //1. useForm 훅 사용
  const { values, errors, touched, getInputProps } =
    useForm<UserSignInInformation>({
      initalValue: {
        email: "",
        password: "",
      },
      validate: validateSignIn,
    });

  //2. 버튼 비활성화 로직
  const isButtonDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value == "");

  //3. 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;
  };

  //뒤로가기 버튼 위한 네비게이트
  const navigate = useNavigate();

  return (
    <div className="flex  flex-col justify-center items-center gap-4 h-dvh bg-gray-200">
      <div className="flex items-center justify-between w-[300px] p-[10px] border-transparent">
        <div className="flex-1 text-left" onClick={() => navigate(-1)}>
          <span className="cursor-pointer">⏮</span>
        </div>
        <div className="flex-1 text-center">로그인</div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={`text-center border border-[black] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm`}
        >
          구글 로그인
        </div>
        <p className="text-center">-------------OR-------------</p>
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          //useForm에서 반환된 속성들을 스프레드 연산자로 전달
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
            ${
              touched?.email && errors?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          //useForm에서 반환된 속성들을 스프레드 연산자로 전달
          className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
            ${
              touched?.password && errors?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colores cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
