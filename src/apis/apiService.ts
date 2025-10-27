import axiosInstance from './axiosInstance';

// 사용자 정보 조회 예시
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('../users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// 보호된 리소스 요청 예시
export const getProtectedData = async () => {
  try {
    const response = await axiosInstance.get('protected');
    return response.data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    throw error;
  }
};

// POST 요청 예시
export const updateUserData = async (data: any) => {
  try {
    const response = await axiosInstance.post('../users/me', data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// 이 파일의 모든 API 호출은 자동으로:
// 1. Access Token을 헤더에 포함
// 2. 401 에러 발생 시 자동으로 Refresh Token으로 토큰 갱신
// 3. 갱신된 토큰으로 원래 요청 재시도
// 4. 토큰 갱신 실패 시 로그인 페이지로 리다이렉트