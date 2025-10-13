import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import useLocalStorage from "../hooks/useLocalStorage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>("authToken", null);
  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState("");

  const signupSchema = z
    .object({
      email: z.string().email("유효하지 않은 이메일 형식입니다."),
      password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
      passwordCheck: z.string(),
      nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["passwordCheck"],
    });

  const methods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = methods;

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/login");
    }
  };

  const handleEmailNext = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      setSavedEmail(getValues("email"));
      setStep(2);
    }
  };

  const handlePasswordNext = async () => {
    const isValid = await trigger(["password", "passwordCheck"]);
    if (isValid) {
      setStep(3);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const fakeToken = `fake-jwt-token-${Date.now()}`;
      console.log("Saving token:", fakeToken);
      setToken(fakeToken);
      localStorage.setItem("nickname", data.nickname);
      navigate(`/`);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center min-h-screen bg-black pt-10">
          <div className="w-full max-w-xs flex flex-col items-stretch gap-5">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute left-0">
                <span className="text-white text-2xl" onClick={handleBack}>
                  ←
                </span>
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
                  {...register("email")}
                  placeholder="이메일을 입력해주세요!"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
                />
                {errors.email && <div className="text-red-500 mt-1 text-sm px-1">{errors.email.message}</div>}
                <button type="button" className="w-full mt-2 rounded-md py-3 font-medium transition bg-pink-500 text-white hover:cursor-pointer" onClick={handleEmailNext}>
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
                  {...register("password")}
                  placeholder="비밀번호를 입력해주세요!"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
                />
                {errors.password && <div className="text-red-500 mt-1 text-sm px-1">{errors.password.message}</div>}
                <input
                  type="password"
                  {...register("passwordCheck")}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none mt-3"
                />
                {errors.passwordCheck && <div className="text-red-500 mt-1 text-sm px-1">{errors.passwordCheck.message}</div>}
                <button type="button" className="w-full mt-2 rounded-md py-3 font-medium transition bg-pink-500 text-white hover:cursor-pointer" onClick={handlePasswordNext}>
                  다음
                </button>
              </>
            )}

            {step === 3 && (
              <>
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
                    {...register("nickname")}
                    placeholder="닉네임을 입력하세요"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
                    maxLength={12}
                  />
                  {errors.nickname && <div className="text-red-500 mt-1 text-sm px-1">{errors.nickname.message}</div>}
                  <button className="w-full mt-2 rounded-md py-3 font-medium transition bg-pink-500 text-white hover:cursor-pointer" type="submit">
                    회원가입 완료
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
