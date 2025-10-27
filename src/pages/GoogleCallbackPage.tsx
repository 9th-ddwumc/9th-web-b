// src/pages/GoogleCallbackPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;
    
    console.log('🔍 GoogleCallbackPage 실행!');
    
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    
    console.log('🔑 accessToken:', accessToken);
    console.log('🔑 refreshToken:', refreshToken);

    setProcessed(true);

    if (accessToken && refreshToken) {
      console.log('✅ 토큰 있음! 로그인 처리...');
      login(accessToken, refreshToken);
      setTimeout(() => navigate('/'), 100);
    } else {
      console.log('❌ 토큰 없음! 로그인 페이지로...');
      setTimeout(() => navigate('/login'), 100);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-600 text-lg">로그인 처리 중...</div>
    </div>
  );
};

export default GoogleCallbackPage;