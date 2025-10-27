// 경로: /src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/google/callback" element={<GoogleLoginRedirectPage />} />
        <Route 
          path="/mypage" 
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;