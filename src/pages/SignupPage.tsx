import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod 스키마 정의 (데이터의 설계도)
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호를 다시 한 번 입력해주세요!"),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 에러가 발생할 필드를 지정
  });

// Zod 스키마로부터 TypeScript 타입 추론
type SignupFormData = z.infer<typeof signupSchema>;

// 눈 아이콘 SVG 컴포넌트
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    className="w-5 h-5"
  >
    {visible ? (
      // 눈을 뜬 모양
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5S3.423 16.49 2.036 12.322zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ) : (
      // 눈을 감은 모양
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243a3 3 0 11-4.243-4.243"
      />
    )}
  </svg>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger, // 특정 필드의 유효성을 검사하는 함수
    formState: { errors, isValid }, // errors 객체와 전체 폼 유효성
    getValues, // 현재 폼의 값들을 가져오는 함수
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // 입력값이 바뀔 때마다 유효성 검사
  });

  // 다음 단계로 이동하는 함수
  const handleNext = async () => {
    let fieldsToValidate: ("email" | "password" | "confirmPassword")[] = [];
    if (step === 1) fieldsToValidate = ["email"];
    if (step === 2) fieldsToValidate = ["password", "confirmPassword"];

    const isValidStep = await trigger(fieldsToValidate);
    if (isValidStep) {
      setStep((prev) => prev + 1);
    }
  };

  // 최종 회원가입 제출 함수
  const onSignupSubmit = (data: SignupFormData) => {
    console.log("회원가입 완료:", data);
    alert("회원가입이 완료되었습니다!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">돌려돌려LP판</h1>
        <div className="flex gap-2">
          <button className="bg-gray-800 px-4 py-2 rounded-md text-sm" onClick={() => navigate('/')}>로그인</button>
          <button className="bg-pink-500 px-4 py-2 rounded-md text-sm">회원가입</button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-sm relative">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="absolute -top-12 left-0 text-2xl">&lt;</button>
          <h1 className="text-2xl font-semibold mb-6 text-center">회원가입</h1>
          
          {/* form 태그가 전체 단계를 감싸도록 변경 */}
          <form onSubmit={handleSubmit(onSignupSubmit)}>
            {/* STEP 1: 이메일 */}
            {step === 1 && (
  <div className="flex flex-col gap-4">
    {/* 1. 구글 로그인 버튼 */}
    <button
      type="button"
      className="w-full border border-gray-500 py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      구글 로그인
    </button>

    {/* 2. 'OR' 구분선 */}
    <div className="flex items-center">
      <div className="flex-1 h-px bg-gray-600" />
      <span className="px-2 text-gray-400 text-sm">OR</span>
      <div className="flex-1 h-px bg-gray-600" />
    </div>

    {/* 3. 이메일 입력 필드 */}
    <div>
      <input
        type="email"
        placeholder="이메일을 입력해주세요!"
        {...register("email")}
        className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      )}
    </div>

    {/* 4. '다음' 버튼 */}
    <button
      type="button"
      onClick={handleNext}
      disabled={!!errors.email || !getValues("email")}
      className={`py-2.5 rounded-md transition-colors ${
        !errors.email && getValues("email")
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-gray-700 cursor-not-allowed"
      }`}
    >
      다음
    </button>
  </div>
)}

            {/* STEP 2: 비밀번호 */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 text-left mb-2">{getValues("email")}</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요!"
                    {...register("password")}
                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
                  />
                  {/* EyeIcon */}
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 한 번 입력해주세요!"
                    {...register("confirmPassword")}
                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
                  />
                  {/* EyeIcon */}
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                <button type="button" onClick={handleNext} disabled={!!errors.password || !!errors.confirmPassword}
                  className={`py-2.5 rounded-md transition-colors ${!errors.password && !errors.confirmPassword ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-700 cursor-not-allowed"}`}>
                  다음
                </button>
              </div>
            )}

            {/* STEP 3: 닉네임 */}
            {step === 3 && (
              <div className="flex flex-col gap-4 items-center">
                {/* 프로필 이미지 영역 */}
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname")}
                  className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
                />
                {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
                <button type="submit" disabled={!isValid}
                  className={`w-full py-2.5 rounded-md transition-colors ${isValid ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-700 cursor-not-allowed"}`}>
                  회원가입 완료
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;