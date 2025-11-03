import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import My from "./pages/Mypages";
import ProtectedRoute from "./protectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

import Layout from "./components/Layout";
import DetailPage from "./pages/DetailPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="mypage"
            element={
              <ProtectedRoute>
                <My />
              </ProtectedRoute>
            }
          />
          <Route path="lp/:lpid" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
