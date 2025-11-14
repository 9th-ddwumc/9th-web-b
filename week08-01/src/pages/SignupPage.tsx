import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log("회원가입 성공", response);
      alert("회원가입이 완료되었습니다 🎉");
      navigate("/login");
    } catch (error) {
      console.log("회원가입 실패", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between w-[320px] mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition"
        >
          ⏮
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">회원가입</h1>
        <div className="w-6" />
      </div>

      {/* 회원가입 카드 */}
      <div className="flex flex-col gap-3 bg-gray-800 p-6 rounded-xl shadow-md w-[320px]">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-gray-400 rounded-md py-2 hover:bg-gray-700 transition"
        >
          <img src="/images/google.svg" alt="구글 로고" className="w-5 h-5" />
          <span>Google 계정으로 가입</span>
        </button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-gray-400 text-xs">또는</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* 이메일 */}
        <input
          {...register("email")}
          type="email"
          placeholder="이메일을 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            errors?.email
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        {/* 비밀번호 */}
        <input
          {...register("password")}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            errors?.password
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        {/* 비밀번호 확인 */}
        <input
          {...register("passwordCheck")}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            errors?.passwordCheck
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors.passwordCheck && (
          <p className="text-red-400 text-sm">{errors.passwordCheck.message}</p>
        )}

        {/* 이름 */}
        <input
          {...register("name")}
          type="text"
          placeholder="이름을 입력해주세요"
          className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none border ${
            errors?.name
              ? "border-red-500"
              : "border-transparent focus:border-pink-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

        {/* 버튼 */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md mt-2 transition disabled:bg-gray-500"
        >
          회원가입
        </button>

        {/* 하단 링크 */}
        <p className="text-center text-gray-400 text-sm mt-2">
          이미 계정이 있으신가요?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline cursor-pointer"
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
