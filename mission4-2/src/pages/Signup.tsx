import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function Signup() {
  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});

  // 유효성 검사 함수
  const validateEmail = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "유효하지 않은 이메일 형식입니다.";
    }
    return errors;
  };
  const validatePassword = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 6) {
      errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    if (values.password !== values.passwordCheck) {
      errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
    }
    return errors;
  };

  // 입력값 변경 핸들러 - 단계별 실시간 유효성 검사
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValues = { ...values, [e.target.name]: e.target.value };
    setValues(nextValues);
    if (step === 1) setErrors(validateEmail(nextValues));
    else if (step === 2) setErrors(validatePassword(nextValues));
  };

  // 이메일 단계 '다음'
  const handleEmailNext = () => {
    const emailErrors = validateEmail(values);
    setErrors(emailErrors);
    if (Object.keys(emailErrors).length > 0) return;
    setSavedEmail(values.email);
    setStep(2);
    setErrors(validatePassword(values));
  };

  // 비밀번호 단계 '다음'
  const handlePasswordNext = () => {
    const pwErrors = validatePassword(values);
    setErrors(pwErrors);
    if (Object.keys(pwErrors).length > 0) return;
    setStep(3);
  };

  // 닉네임 입력 핸들러 및 유효성
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (!e.target.value.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
    } else if (e.target.value.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
    } else {
      setNicknameError("");
    }
  };

  // 회원가입 완료 클릭
  const handleFinish = () => {
    if (!nickname.trim() || nickname.length < 2) {
      setNicknameError("닉네임을 올바르게 입력해주세요.");
      return;
    }
    alert("회원가입 완료! 🎉");
  };

  // 버튼 활성화 조건
  const isEmailValid = values.email.length > 0 && Object.keys(validateEmail(values)).length === 0;
  const isPasswordValid = values.password.length >= 6 && values.passwordCheck.length >= 6 && Object.keys(validatePassword(values)).length === 0;

  const isNicknameValid = nickname.trim().length >= 2 && !nicknameError;

  return (
    <div className="flex justify-center min-h-screen bg-black pt-10">
      <div className="w-full max-w-xs flex flex-col items-stretch gap-5">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0">
            <span className="text-white text-2xl">←</span>
          </div>
          <h2 className="text-white text-xl font-bold text-center w-full">회원가입</h2>
        </div>

        {step === 1 && (
          <>
            <button className="flex items-center justify-center gap-2 w-full bg-neutral-900 border border-neutral-600 rounded-md py-3 text-white text-base mb-2 hover:bg-neutral-800 transition">
              구글 로그인
            </button>
            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-neutral-600" />
              <span className="mx-4 text-neutral-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-neutral-600" />
            </div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요!"
              className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
            />
            {errors.email && <div className="text-red-500 mt-1 text-sm px-1">{errors.email}</div>}
            <button
              className={`w-full mt-2 rounded-md py-3 font-medium transition ${isEmailValid ? "bg-pink-500 text-white hover:cursor-pointer" : "bg-neutral-700 text-gray-400 cursor-not-allowed"}`}
              disabled={!isEmailValid}
              onClick={handleEmailNext}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-neutral-400 flex items-center gap-2">
              <span>✉️</span>
              {savedEmail}
            </div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요!"
              className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
            />
            {errors.password && <div className="text-red-500 mt-1 text-sm px-1">{errors.password}</div>}
            <input
              type="password"
              name="passwordCheck"
              value={values.passwordCheck}
              onChange={handleChange}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none mt-3"
            />
            {errors.passwordCheck && <div className="text-red-500 mt-1 text-sm px-1">{errors.passwordCheck}</div>}
            <button
              className={`w-full mt-2 rounded-md py-3 font-medium transition ${isPasswordValid ? "bg-pink-500 text-white hover:cursor-pointer" : "bg-neutral-700 text-gray-400 cursor-not-allowed"}`}
              disabled={!isPasswordValid}
              onClick={handlePasswordNext}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {/* 프로필 이미지 영역 */}
            <div className="flex flex-col items-center gap-5">
              <div className="flex justify-center mb-3">
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: "#dedede",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="#fff" />
                    <ellipse cx="12" cy="16" rx="6" ry="4" fill="#fff" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력하세요"
                className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none text-center"
                maxLength={12}
              />
              {nicknameError && <div className="text-red-500 mt-1 text-sm px-1">{nicknameError}</div>}
              <button
                className={`w-full mt-2 rounded-md py-3 font-medium transition ${isNicknameValid ? "bg-pink-500 text-white hover:cursor-pointer" : "bg-neutral-700 text-gray-400 cursor-not-allowed"}`}
                disabled={!isNicknameValid}
                onClick={handleFinish}
              >
                회원가입 완료
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
