// 경로: /src/pages/GoogleLoginRedirectPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../apis/googleAuth';
import { useAuth } from '../context/AuthContext';

export default function GoogleLoginRedirectPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // URL에서 인증 코드 추출
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      // 에러가 있으면 로그인 페이지로 이동
      if (error) {
        console.error('Google OAuth error:', error);
        alert('구글 로그인에 실패했습니다.');
        navigate('/login');
        return;
      }

      // 코드가 없으면 로그인 페이지로 이동
      if (!code) {
        console.error('No authorization code found');
        alert('인증 코드를 찾을 수 없습니다.');
        navigate('/login');
        return;
      }

      try {
        // 서버에 인증 코드 전송
        const response = await googleLogin(code);

        if (response.success && response.data) {
          // 로그인 성공
          setAuth(
            response.data.accessToken,
            response.data.refreshToken,
            response.data.user
          );

          // 마이페이지로 이동
          navigate('/mypage');
        } else {
          // 로그인 실패
          alert(response.message || '구글 로그인에 실패했습니다.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Google login error:', error);
        alert('서버 오류가 발생했습니다.');
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-xl">구글 로그인 중...</p>
        <p className="text-gray-400 mt-2">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}