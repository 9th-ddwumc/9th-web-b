import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// 로그아웃 API
const logoutApi = async (token: string) => {
  if (!token) throw new Error("토큰이 없습니다.");
  await axios.post(import.meta.env.VITE_SERVER_API_URL + "/v1/auth/signout", {}, { headers: { Authorization: `Bearer ${token}` } });
};

// 회원 탈퇴 API
const withdrawApi = async (token: string) => {
  if (!token) throw new Error("토큰이 없습니다.");
  await axios.delete(import.meta.env.VITE_SERVER_API_URL + "/v1/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const NavBar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 로그아웃 Mutation
  const logoutMutation = useMutation<void, Error>({
    mutationFn: () => logoutApi(localStorage.getItem("accessToken") ?? ""),
    onSuccess: () => {
      logout();
      alert("로그아웃 되었습니다!");
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    },
  });

  // 회원탈퇴 Mutation (NEW)
  const withdrawMutation = useMutation<void, Error>({
    mutationFn: () => withdrawApi(localStorage.getItem("accessToken") ?? ""),
    onSuccess: () => {
      logout();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    },
    onError: (error: Error) => {
      alert("회원 탈퇴 중 오류가 발생했습니다.");
      console.error(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 탈퇴(Withdraw) 버튼에서 useMutation 호출
  const handleWithdraw = () => {
    withdrawMutation.mutate();
  };

  // 사이드바 외부클릭 시 닫힘
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* 상단 네비게이션 바 */}
      <div className="bg-black w-full flex items-center justify-between px-8 py-4 relative z-50 fixed top-0">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="w-10 h-10 flex items-center justify-center text-white focus:outline-none" aria-label="메뉴 토글">
            <svg width="32" height="32" viewBox="0 0 48 48">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
            </svg>
          </button>
          <div className="text-pink-500 font-bold text-2xl tracking-tight ml-2">돌려돌려LP판</div>
        </div>

        {/* 오른쪽 로그인/로그아웃 영역 */}
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-white text-base">{userName ? `${userName}님 반갑습니다.` : ""}</span>
              <NavLink to="/mypage" className="bg-neutral-900 text-white px-3 py-1 rounded text-sm font-medium hover:bg-neutral-700 transition">
                마이페이지
              </NavLink>
              <button onClick={handleLogout} className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-pink-600 transition">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="bg-neutral-900 text-white px-3 py-1 rounded text-sm font-medium hover:bg-neutral-700 transition">
                로그인
              </NavLink>
              <NavLink to="/signup" className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-pink-600 transition">
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* 어두운 배경 (오버레이) */}
      {menuOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" onClick={() => setMenuOpen(false)} />}

      {/* 슬라이드 메뉴 */}
      <div
        ref={menuRef}
        className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] w-60 bg-neutral-900 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg flex flex-col justify-between`}
      >
        <nav className="flex flex-col gap-6 px-6 pt-8 text-lg">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-pink-500 transition">
            찾기
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/mypage" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-pink-500 transition">
              마이페이지
            </NavLink>
          )}
        </nav>

        {/* 하단 */}
        {isLoggedIn && (
          <button onClick={() => setShowWithdrawModal(true)} className="text-neutral-400 text-sm px-6 pb-6 hover:text-pink-500 transition text-left">
            탈퇴하기
          </button>
        )}
      </div>

      {/* 탈퇴 모달 */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-neutral-800 rounded-lg p-8 shadow-lg max-w-sm w-full flex flex-col items-center relative">
            <button className="absolute top-4 right-4 text-neutral-400 text-2xl font-bold" aria-label="닫기" onClick={() => setShowWithdrawModal(false)}>
              ×
            </button>
            <div className="text-white text-lg mb-8">정말 탈퇴하시겠습니까?</div>
            <div className="flex gap-4">
              <button
                className="bg-neutral-300 text-black px-6 py-2 rounded font-bold"
                onClick={() => {
                  setShowWithdrawModal(false);
                  handleWithdraw();
                }}
              >
                예
              </button>
              <button className="bg-pink-500 text-white px-6 py-2 rounded font-bold" onClick={() => setShowWithdrawModal(false)}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
