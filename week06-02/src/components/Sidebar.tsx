import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ☰ 햄버거 버튼 */}
      <button
        className="absolute top-3.5 left-4 z-[9999] text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          width="33"
          height="33"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M7.95 11.95h32m-32 12h32m-32 12h32"
          />
        </svg>
      </button>

      {/* 사이드바 */}
      <div
        className={`bg-gray-900 w-60 h-screen fixed lg:static top-0 left-0 flex flex-col justify-between transform transition-transform duration-300 z-40 will-change-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* ✅ 상단 메뉴 (항상 보이는 영역) */}
        <div className="p-6 text-gray-300 space-y-4">
          <Link
            to="#"
            onClick={() => setIsOpen(false)}
            className="block hover:text-pink-400"
          >
            찾기
          </Link>
          <Link
            to="/my"
            onClick={() => setIsOpen(false)}
            className="block hover:text-pink-400"
          >
            마이페이지
          </Link>
          <Link
            to="/setting"
            onClick={() => setIsOpen(false)}
            className="block hover:text-pink-400"
          >
            설정
          </Link>
        </div>

        {/* ✅ 하단 고정 */}
        <div className="p-4 border-t border-gray-700 text-center">
          <Link
            to="#"
            onClick={() => setIsOpen(false)}
            className="text-red-400 hover:text-red-500"
          >
            탈퇴하기
          </Link>
        </div>
      </div>

      {/* ✅ 배경 오버레이 (모바일에서만 보임) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
