import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/user";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../hooks/useSidebar";
import { useEffect } from "react";

const Sidebar = () => {
  const { isOpen, open, close, toggle } = useSidebar();
  const { logout } = useAuth();

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("😢 회원 탈퇴가 완료되었습니다.");
      logout();
      window.location.href = "/login";
    },
  });

  /* ESC 키로 닫기 */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  /* Sidebar 열렸을 때 배경 스크롤 방지 */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ☰ 햄버거 버튼 */}
      <button
        className="fixed top-3 left-3 z-[10001] text-white text-2xl rounded-md p-1 hover:bg-gray-700 transition"
        onClick={toggle}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 h-full w-60 fixed top-0 left-0 flex flex-col gap-30
          transform transition-transform duration-300 z-[10000]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 text-gray-300 space-y-4 flex flex-col h-full justify-between">
          <div className="flex flex-col space-y-4 mt-15">
            <Link to="/search" onClick={close} className="hover:text-pink-400">
              찾기
            </Link>
            <Link to="/my" onClick={close} className="hover:text-pink-400">
              마이페이지
            </Link>
            <Link to="/my" onClick={close} className="hover:text-pink-400">
              설정
            </Link>
          </div>
          <div>
            <hr className="border-gray-700 mb-4" />

            <button
              onClick={() => mutate()}
              className="block text-red-400 hover:text-red-500 w-full text-left font-semibold"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </aside>

      {/* 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9999]" onClick={close} />
      )}
    </>
  );
};

export default Sidebar;
