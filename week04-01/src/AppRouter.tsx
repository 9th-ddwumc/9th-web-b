import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />, // 레이아웃으로 감싸기
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies/:category", element: <MoviePage /> },
      { path: "/movie/:movieId", element: <MovieDetailPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
