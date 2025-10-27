import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, getProtectedData } from '../apis/apiService';

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [protectedData, setProtectedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 프로필 정보 가져오기 (토큰 갱신 테스트용)
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile();
      setProfileData(data);
    } catch (err: any) {
      setError(err.message || '프로필 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 보호된 데이터 가져오기 (토큰 갱신 테스트용)
  const fetchProtectedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProtectedData();
      setProtectedData(data);
    } catch (err: any) {
      setError(err.message || '데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>마이페이지</h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>사용자 정보</h2>
        <p><strong>이름:</strong> {user?.name}</p>
        <p><strong>이메일:</strong> {user?.email}</p>
        <p><strong>ID:</strong> {user?.id}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>토큰 갱신 테스트</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          아래 버튼을 클릭하여 API 요청을 보내보세요. 
          Access Token이 만료되면 자동으로 Refresh Token으로 갱신됩니다.
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={fetchProfile}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            프로필 조회
          </button>

          <button
            onClick={fetchProtectedData}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            보호된 데이터 조회
          </button>
        </div>

        {loading && (
          <p style={{ marginTop: '10px', color: '#007bff' }}>
            로딩 중...
          </p>
        )}

        {error && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {profileData && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px'
          }}>
            <strong>프로필 데이터:</strong>
            <pre style={{ marginTop: '5px', fontSize: '12px' }}>
              {JSON.stringify(profileData, null, 2)}
            </pre>
          </div>
        )}

        {protectedData && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            borderRadius: '4px'
          }}>
            <strong>보호된 데이터:</strong>
            <pre style={{ marginTop: '5px', fontSize: '12px' }}>
              {JSON.stringify(protectedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        로그아웃
      </button>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>📝 토큰 갱신 테스트 방법:</strong>
        <ol style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>서버의 Access Token 만료 시간을 짧게 설정 (예: 30초)</li>
          <li>로그인 후 30초 이상 기다리기</li>
          <li>"프로필 조회" 또는 "보호된 데이터 조회" 버튼 클릭</li>
          <li>브라우저 개발자 도구의 Network 탭에서 확인:
            <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
              <li>첫 번째 요청이 401 에러로 실패</li>
              <li>/auth/refresh 엔드포인트로 토큰 갱신 요청</li>
              <li>원래 요청이 새 토큰으로 자동 재시도되어 성공</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}