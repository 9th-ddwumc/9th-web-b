import { validateSignin, type UserSigninInformation } from '../utils/validate.ts';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useState } from 'react';
import { postSignin } from '../apis/auth.ts';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await postSignin({
        email: values.email,
        password: values.password,
      });

      // 토큰 저장
      login(response.data.accessToken, response.data.refreshToken);
      
      // 로그인 성공 후 홈으로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 에러:', error);
      setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직
    console.log("구글 로그인");
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value === "");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 pt-24">
      <div className="flex items-center justify-center w-[300px] relative mb-6">
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-0 text-gray-600 hover:text-gray-900 transition-colors text-lg font-semibold"
        >
          &lt;
        </button>
        <span className='font-semibold text-lg'>로그인</span>
      </div>

      <div className="flex flex-col gap-3 w-[300px]">
        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-md text-base font-medium
          hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9.001c0 1.452.348 2.827.957 4.041l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
          </svg>
          구글 로그인
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 이메일 입력 */}
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          className={`border w-full p-[10px] rounded-md outline-none focus:border-[#807bff] ${
            errors?.email && touched?.email ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        {/* 비밀번호 입력 */}
        <input
          {...getInputProps("password")}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className={`border w-full p-[10px] rounded-md outline-none focus:border-[#807bff] ${
            errors?.password && touched?.password ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {/* 로그인 버튼 */}
        <button
          type='button'
          onClick={handleSubmit}
          disabled={isDisabled || isLoading}
          className="w-full bg-pink-400 text-white py-3 rounded-md text-base font-medium
          hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage;