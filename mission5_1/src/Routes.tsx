import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "./App";
import PublicPage from "./pages/publicPage";
import PrivatePage from "./pages/privatePage";
import ProtectedRoute from "./protextedRoute";

const Routes = () => {
  const userInfo = false; // true는 둘 다 접근 가능, false는 public만 접근 가능
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/public",
          element: <PublicPage />,
        },
        {
          path: "/private",
          element: <ProtectedRoute userInfo={userInfo} />,
          children: [{ path: "/private", element: <PrivatePage /> }],
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default Routes;
