import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MoviePage }  from './pages/MoviePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createBrowserRouter([
  
   { path: '/', element: <HomePage />, errorElement: <NotFoundPage /> },
  { path: '/movies/:category', element: <MoviePage /> },
  { path: '/movies/:movieId', element: <MovieDetailPage /> },
  
  // '/' 경로 외에 다른 최상위 경로가 필요하다면 여기에 추가합니다.
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};