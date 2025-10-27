import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apis/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value && value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    // 유효성 검사
    if (!email || !password) {
      if (!email) setEmailError('이메일을 입력해주세요.');
      if (!password) setPasswordError('비밀번호를 입력해주세요.');
      return;
    }
    
    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);

    try {
      // API 호출
      const response = await login({ email, password });

      if (response.success && response.data) {
        // 로그인 성공
        setIsSuccess(true);
        setModalMessage('로그인에 성공했습니다!');
        setShowModal(true);
        
        // 인증 정보 저장
        setAuth(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.user
        );

        // 2초 후 마이페이지로 이동
        setTimeout(() => {
          setShowModal(false);
          navigate('/mypage');
        }, 2000);
      } else {
        // 로그인 실패
        setIsSuccess(false);
        setModalMessage(response.message || '로그인에 실패했습니다.');
        setShowModal(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setModalMessage('서버 오류가 발생했습니다.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (!isSuccess) {
      // 실패 시 입력 필드 초기화 (선택사항)
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">





          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-gray-900 border ${
                emailError ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:border-pink-500 transition disabled:opacity-50`}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-gray-900 border ${
                passwordError ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:border-pink-500 transition disabled:opacity-50`}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading || !!emailError || !!passwordError}
            className="w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full border border-gray-700">
            <div className="text-center">
              {/* 아이콘 */}
              <div className="mb-4">
                {isSuccess ? (
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* 메시지 */}
              <h3 className="text-xl font-semibold mb-2 text-white">
                {isSuccess ? '로그인 성공' : '로그인 실패'}
              </h3>
              <p className="text-gray-400 mb-6">{modalMessage}</p>
              
              {/* 버튼 */}
              {!isSuccess && (
                <button
                  onClick={closeModal}
                  className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                  확인
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}