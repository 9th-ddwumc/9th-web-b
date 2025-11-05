import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      {/* 상단 네비게이션 */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* ✅ 사이드바는 고정 */}
        <Sidebar />

        {/* ✅ 메인 영역만 스크롤되도록 */}
        <main className="flex-1 overflow-y-auto mt-10 px-6 pb-20">
          <Outlet />
          {/* 플로팅 버튼 */}
          <Link
            to={"/my"}
            className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl"
          >
            +
          </Link>
        </main>
      </div>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
