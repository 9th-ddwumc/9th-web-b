import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { accessToken } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#161616]">
      <Navbar toggleSidebar={toggleSidebar} />
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
      <div className="relative flex flex-row flex-1">
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 z-50 md:static h-full">
            <Sidebar />
          </div>
        )}
        <main
          onClick={closeSidebar}
          className="flex-1 relative z-10 text-pink-600"
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;