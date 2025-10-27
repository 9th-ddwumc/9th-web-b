import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='flex items-center justify-end gap-3 px-6 py-4 border-b'>
      <button
        type='button'
        onClick={() => navigate('/')}
        className='text-xl font-bold text-transparent bg-clip-text bg-pink-600 hover:from-pink-500 hover:to-purple-600 transition-all absolute left-6'
      >
        돌려돌려애득!
      </button>
      
      {/* 마이페이지 버튼 - 항상 표시 */}
      <button 
        type='button'
        className='px-5 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all'
        onClick={() => navigate('/mypage')}
      >
        마이페이지
      </button>

      {/* 로그인 상태에 따라 다른 버튼 표시 */}
      {isAuthenticated ? (
        // 로그인 상태 - 로그아웃 버튼
        <button 
          type='button'
          className='px-5 py-2 text-sm font-medium text-white bg-pink-400 rounded-lg hover:bg-pink-500 transition-all'
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        // 로그아웃 상태 - 로그인, 회원가입 버튼
        <>
          <button 
            type='button'
            className='px-5 py-2 text-sm font-medium text-white bg-pink-400 rounded-lg hover:bg-pink-500 transition-all'
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
          <button 
            type='button'
            className='px-5 py-2 text-sm font-medium border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-50 transition-all'
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </>
      )}
    </div>
  );
}