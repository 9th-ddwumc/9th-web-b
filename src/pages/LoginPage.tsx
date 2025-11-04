import type { UserSigninInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // const { setAccessToken } = useAuth();

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    // try {
    //   const response: ResponseSigninDto = await postSignin(values);
    //   setItem(response.data.accessToken); // accessToken 저장
    //   setAccessToken(response.data.accessToken);
    //   console.log("✅ 로그인 성공! 토큰:", response.data.accessToken);
    //   navigate("/mypage");
    // } catch (error) {
    //   console.error("❌ 로그인 실패:", error);
    //   alert("로그인에 실패했습니다.");
    // }
    await login(values);
  };

  // 구글 로그인 리다이렉트 처리
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white py-20">
      <div className="flex flex-col gap-3 w-[300px]">
        {/* 뒤로가기 */}
        <div className="relative flex items-center justify-center py-2">
          <button
            className="absolute left-4 text-white text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src="https://icon-library.com/images/ios-back-icon/ios-back-icon-10.jpg"
              alt="뒤로가기"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-xl font-bold text-white">로그인</h1>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-white rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-white transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        {/* 구분선 */}
        <div className="flex items-center w-full gap-2 text-gray-400 mt-7 mb-7">
          <div className="flex-1 h-px bg-gray-500" />
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-500" />
        </div>

        <input
          {...getInputProps("email")}
          name="email"
          type={"email"}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:outline-2 placeholder-gray-200 text-white `}
          placeholder="이메일을 입력해주세요"
        />
        {/* 새로고침 했을 때 경고 문구 안 보이게  */}
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          type={"password"}
          className={`border border-[#ccc] w-[300px] p-[10px] rounded-sm focus:outline-2 placeholder-gray-200 text-white `}
          placeholder="비밀번호를 입력해주세요"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-bold hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-700"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;