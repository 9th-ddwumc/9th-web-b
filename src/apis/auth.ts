// API 기본 설정
const API_BASE_URL = 'http://localhost:8000/v1/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

// 로그인 API 호출
export const login = async (signinData: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log('Sending login request to:', `${API_BASE_URL}/signin`);
    console.log('Request body:', signinData);
    
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinData),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || data.error || '로그인에 실패했습니다.',
      };
    }

    // Swagger 응답 구조에 맞게 데이터 매핑
    // data 객체 안에 있을 수도 있고, 최상위에 있을 수도 있음
    const responseData = data.data || data;
    
    return {
      success: true,
      message: data.message || '로그인에 성공했습니다.',
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
    console.error('Login error:', error);
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다.',
    };
  }
};

// 토큰 갱신 API
export const refreshAccessToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || '토큰 갱신에 실패했습니다.',
      };
    }

    return {
      success: true,
      message: '토큰이 갱신되었습니다.',
      data: {
        accessToken: data.accessToken || data.access_token,
        refreshToken: data.refreshToken || data.refresh_token,
        user: data.user,
      },
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return {
      success: false,
      message: '토큰 갱신 중 오류가 발생했습니다.',
    };
  }
};