// 경로: /src/apis/googleAuth.ts

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/v1';

// 구글 로그인 URL 생성
export const getGoogleAuthUrl = () => {
  // 디버깅용 로그
  console.log('Google Client ID:', GOOGLE_CLIENT_ID);
  console.log('Redirect URI:', GOOGLE_REDIRECT_URL);
  
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your_google_client_id_here.apps.googleusercontent.com') {
    alert('Google Client ID가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    return '';
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URL,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid'
    ].join(' '),
    access_type: 'offline',
    prompt: 'consent'
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  console.log('Generated Google Auth URL:', url);
  
  return url;
};

// 구글 인증 코드로 서버에서 토큰 받기
export const googleLogin = async (code: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || '구글 로그인에 실패했습니다.',
      };
    }

    const responseData = data.data || data;

    return {
      success: true,
      message: '로그인에 성공했습니다.',
      data: {
        accessToken: responseData.accessToken || responseData.access_token,
        refreshToken: responseData.refreshToken || responseData.refresh_token,
        user: responseData.user || {
          id: responseData.id || responseData.userId || responseData.user_id,
          email: responseData.email,
          name: responseData.name || responseData.username || responseData.user_name,
        },
      },
    };
  } catch (error) {
    console.error('Google login error:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.',
    };
  }
};