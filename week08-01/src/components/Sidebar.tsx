import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/user";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

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
      {/* ☰ 햄버거 버튼 (항상 보이게) */}
      <button
        className="fixed top-3 left-3 z-[10001] text-white text-2xl rounded-md p-1 hover:bg-gray-700 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          width="30"
          height="30"
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

      {/* ✅ 사이드바 */}
      <aside
        className={`bg-gray-900 h-full w-60 fixed lg:static top-0 left-0 flex flex-col justify-between 
        transform transition-transform duration-300 z-[10000]
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 text-gray-300 space-y-4 flex flex-col h-full justify-between">
          <div className="space-y-4">
            <Link
              to="/search"
              onClick={() => setIsOpen(false)}
              className="mt-10 block hover:text-pink-400"
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
              to="/my"
              onClick={() => setIsOpen(false)}
              className="block hover:text-pink-400"
            >
              설정
            </Link>
            <hr className="border-gray-700 mt-95 mb-4" />
            <button
              onClick={() => setShowModal(true)}
              className="block text-red-400 hover:text-red-500 w-full text-left font-semibold"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </aside>

      {/* ✅ 배경 오버레이 (모바일 전용) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-[9999]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ✅ 탈퇴 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10002]">
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
