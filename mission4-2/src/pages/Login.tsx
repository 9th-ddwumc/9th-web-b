import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

// 로그인 요청 API 함수
async function loginApi(data: LoginFormValues) {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data.data; // { accessToken, refreshToken, name }
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ AuthContext에서 login 함수 가져오기

  const validate = useCallback((values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "유효하지 않은 이메일 형식입니다.";
    }
    if (values.password.length < 6) {
      errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    return errors;
  }, []);

  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormValues>({ email: "", password: "" }, validate);

  // useMutation으로 로그인 처리
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken, data.name);
      alert("로그인 성공!");
      navigate("/");
    },
    onError: () => {
      alert("로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.");
    },
  });

  const onSubmit = (formData: LoginFormValues) => {
    loginMutation.mutate(formData);
  };

  // 구글 로그인 버튼 그대로 유지
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isValid = !errors.email && !errors.password && values.email && values.password;

  return (
    <div className="flex justify-center min-h-screen bg-black pt-10">
      <div className="w-full max-w-xs flex flex-col items-stretch gap-5">
        {/* 상단 */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0">
            <span className="text-white text-2xl cursor-pointer" onClick={() => navigate("/")}>
              ←
            </span>
          </div>
          <h2 className="text-white text-xl font-bold text-center w-full">로그인</h2>
        </div>

        {/* Google 로그인 */}
        <button onClick={handleGoogleLogin} className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium transition">
          Google로 로그인
        </button>

        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-neutral-600" />
          <span className="mx-4 text-neutral-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-600" />
        </div>

        {/* 이메일 */}
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요!"
          className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
        />
        {values.email && errors.email && <div className="text-red-500 mt-1 text-sm px-1">{errors.email}</div>}

        {/* 비밀번호 */}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요!"
          className="w-full bg-neutral-900 border border-neutral-700 rounded py-3 px-4 text-white placeholder-neutral-500 outline-none"
        />
        {values.password && errors.password && <div className="text-red-500 mt-1 text-sm px-1">{errors.password}</div>}

        {/* 로그인 버튼 */}
        <button
          className={`w-full mt-2 rounded-md py-3 font-medium transition ${isValid ? "bg-pink-500 text-white hover:cursor-pointer" : "bg-neutral-700 text-gray-400 cursor-not-allowed"}`}
          disabled={!isValid || loginMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}
