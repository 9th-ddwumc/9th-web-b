import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
