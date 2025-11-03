import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ☰ 햄버거 버튼 (항상 보임) */}
      <button
        className="fixed top-3.5 left-4 z-[9999] text-white text-2xl"
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
        className={`bg-gray-900 h-full w-60 fixed lg:static top-0 left-0 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* ✅ 상단 메뉴 — 햄버거 밑으로 내림 */}
        <div className="flex flex-col space-y-4 text-gray-300 flex-1 p-4 mt-16 lg:mt-3">
          <Link to="#" onClick={() => setIsOpen(false)}>
            찾기
          </Link>
          <Link to="/my" onClick={() => setIsOpen(false)}>
            마이페이지
          </Link>
        </div>

        {/* 하단 고정 메뉴 */}
        <div className="mt-auto text-center">
          <Link
            to="#"
            onClick={() => setIsOpen(false)}
            className="text-red-400 hover:text-red-500 text-center"
          >
            탈퇴하기
          </Link>
        </div>
      </div>

      {/* 배경 오버레이 (모바일에서만 보임) */}
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
