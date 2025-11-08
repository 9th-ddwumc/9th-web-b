import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/user"; // ✅ 추가
import { useAuth } from "../context/AuthContext"; // ✅ 추가

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태
  const { logout } = useAuth();

  // ✅ 탈퇴 mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("😢 회원 탈퇴가 완료되었습니다.");
      logout();
      window.location.href = "/login";
    },
    onError: (err) => {
      console.error("❌ 탈퇴 실패:", err);
      alert("탈퇴 중 오류가 발생했습니다.");
    },
  });

  const handleDeleteConfirm = () => {
    deleteMutation.mutate();
    setShowModal(false);
  };

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
        className={`bg-gray-900 w-60 h-full fixed lg:static top-0 left-0 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* 상단 메뉴 */}
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

        {/* 하단 고정 버튼 */}
        <div className="p-4 border-t border-gray-700 text-center mt-auto">
          <button
            onClick={() => setShowModal(true)}
            className="text-red-400 hover:text-red-500 w-full"
          >
            탈퇴하기
          </button>
        </div>
      </div>

      {/* 배경 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ✅ 탈퇴 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white w-80">
            <h2 className="text-lg font-semibold mb-4">
              정말 탈퇴하시겠습니까?
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              탈퇴 후에는 계정을 복구할 수 없습니다.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
              >
                예
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold"
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
