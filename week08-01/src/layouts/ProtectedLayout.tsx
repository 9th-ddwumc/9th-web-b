import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import AddLpModal from "../components/AddLpModal";

const ProtectedLayout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthPage = ["/login", "/signup", "/v1/auth/google/callback"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-[#0f1624] text-white flex flex-col">
      <Navbar />

      {/* ✅ 메인 영역 */}
      <div className="relative flex flex-1 min-h-0">
        {/* 사이드바 */}
        {!isAuthPage && <Sidebar />}

        {/* 본문 */}
        <main className="flex-1 overflow-y-auto bg-[#0f1624] pt-24 pb-16 transition-all duration-300">
          <Outlet />
          <Footer />
        </main>
      </div>

      {/* ✅ 플로팅 추가 버튼 */}
      {!isAuthPage && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 
            text-white font-bold rounded-full shadow-lg w-14 h-14 flex items-center 
            justify-center text-2xl transition-transform hover:scale-105"
          >
            +
          </button>

          {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default ProtectedLayout;
