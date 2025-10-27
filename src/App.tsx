import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import HomeLayout from './layouts/HomeLayout.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import MyPage from './pages/MyPage.tsx';  
import GoogleCallbackPage from './pages/GoogleCallbackPage.tsx'; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      // 🔒 보호된 라우트들
      {
        element: <ProtectedLayout />,
        children: [
          { path: "mypage", element: <MyPage /> }, 
        ],
      },
    ],
  },
  {
    path: "/v1/auth/google/callback",
    element: <GoogleCallbackPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;