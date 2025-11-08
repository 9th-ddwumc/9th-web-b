import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import AddLpModal from "../components/AddLpModal"; // ✅ 모달 import 추가

const HomeLayout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가
  const isAuthPage = ["/login", "/signup", "/v1/auth/google/callback"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />

      <div className="flex flex-1 min-h-0">
        {!isAuthPage && <Sidebar />}

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-950 p-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      {/* ✅ 플로팅 버튼 → 모달 오픈 */}
      {!isAuthPage && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl transition-transform hover:scale-105"
          >
            +
          </button>

          {/* ✅ 모달 표시 */}
          {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default HomeLayout;
