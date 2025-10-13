import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Link} from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ 유효성 검사 (기존 코드와 동일)
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    if (!values.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    }
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({ email: '', password: '' }, validate);

  const isFormValid =
    values.email &&
    values.password &&
    Object.keys(errors).length === 0 &&
    values.password.length >= 8;

  const onSubmit = (formValues) => {
    console.log('로그인 시도:', formValues);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== 1. 헤더 추가 ===== */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">돌려돌려LP판</h1>
        <div className="flex gap-2">
          <button className="bg-gray-800 px-4 py-2 rounded-md text-sm">
            로그인
          </button>
           {/* ===== ✅ 2. <button>을 <Link>로 변경 ===== */}
          <Link to="/signup" className="bg-pink-500 px-4 py-2 rounded-md text-sm">
            회원가입
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-sm relative">
          {/* ===== 2. 뒤로가기 버튼 추가 ===== */}
          <button
            onClick={() => navigate(-1)}
            className="absolute -top-12 left-0 text-2xl"
          >
            &lt;
          </button>

          <h1 className="text-2xl font-semibold mb-6 text-center">로그인</h1>

          {/* ===== 3. 구글 로그인 버튼 추가 ===== */}
          <button className="w-full border border-gray-500 py-2.5 rounded-md mb-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            구글 로그인
          </button>

          {/* ===== 4. 'OR' 구분선 추가 ===== */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* 이메일 입력 (기존 코드와 동일) */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요!"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
              />
              {touched.email && errors.email && (
                <p className="text-pink-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 (기존 코드와 동일) */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요!"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-pink-500"
              />
              {touched.password && errors.password && (
                <p className="text-pink-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* 로그인 버튼 (기존 코드와 동일) */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`mt-4 py-2.5 rounded-md transition-colors ${
                isFormValid
                  ? 'bg-pink-500 hover:bg-pink-600'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;