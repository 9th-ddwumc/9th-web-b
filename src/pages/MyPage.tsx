import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          로그아웃
        </button>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6">마이페이지</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-6 bg-gray-800 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">사용자 ID</h4>
                <p className="text-gray-400">{user.id}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">계정 상태</h4>
                <p className="text-green-400">활성</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}