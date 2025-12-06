import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import search from "../../public/search.png";
import { useSearchBar } from "../context/SearchBarContext";
import { useSidebar } from "../context/SidebarContext";

const NavBar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const { isOpen: menuOpen, open, close, toggle } = useSidebar();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useSearchBar();
  const navigate = useNavigate();

  const logoutMutation = useMutation<void, Error>({
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("토큰이 없습니다.");

      return axios.post(
        import.meta.env.VITE_SERVER_API_URL + "/v1/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      logout();
      alert("로그아웃 되었습니다!");
      navigate("/");
    },
  });

  const withdrawMutation = useMutation<void, Error>({
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("토큰이 없습니다.");

      return axios.delete(import.meta.env.VITE_SERVER_API_URL + "/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      logout();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    },
  });

  const handleLogout = () => logoutMutation.mutate();
  const handleWithdraw = () => withdrawMutation.mutate();

  // 사이드바 외부 클릭 → close()
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, close]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [menuOpen, close]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 막음
    } else {
      document.body.style.overflow = "auto"; // 원래대로
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-black w-full flex items-center justify-between px-8 py-4 fixed top-0 z-50">
        <div className="flex items-center">
          <button onClick={toggle} className="w-10 h-10 flex items-center justify-center text-white">
            <svg width="32" height="32" viewBox="0 0 48 48">
              <path stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
            </svg>
          </button>

          <div className="text-pink-500 font-bold text-2xl ml-2">돌려돌려LP판</div>
        </div>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <button onClick={() => setIsOpen(!isOpen)} className="w-6 h-6 flex items-center justify-center text-white">
                <img src={search} alt="search" className="w-6 h-6" />
              </button>

              <span className="text-white text-base">{userName ? `${userName}님 반갑습니다.` : ""}</span>

              <NavLink to="/mypage" className="bg-neutral-900 text-white px-3 py-1 rounded text-sm font-medium">
                마이페이지
              </NavLink>

              <button onClick={handleLogout} className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="bg-neutral-900 text-white px-3 py-1 rounded text-sm font-medium">
                로그인
              </NavLink>
              <NavLink to="/signup" className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium">
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* 오버레이 */}
      {menuOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={close} />}

      {/* 슬라이드 사이드바 */}
      {/* 슬라이드 사이드바 */}
      <div
        ref={menuRef}
        className={`fixed top-[72px] left-0 w-60 h-[calc(100vh-72px)] bg-neutral-900 text-white transition-transform duration-300 z-50 
  ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
  flex flex-col justify-between`} // ← 추가됨!!
      >
        {/* 상단 메뉴 */}
        <nav className="flex flex-col gap-6 px-6 pt-8 text-lg">
          <NavLink to="/" onClick={close} className="hover:text-pink-500">
            찾기
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/mypage" onClick={close} className="hover:text-pink-500">
              마이페이지
            </NavLink>
          )}
        </nav>

        {/* 하단 탈퇴 버튼 */}
        {isLoggedIn && (
          <button onClick={() => setShowWithdrawModal(true)} className="text-neutral-400 text-sm px-6 pb-6 hover:text-pink-500 text-left">
            탈퇴하기
          </button>
        )}
      </div>

      {/* 탈퇴 모달 */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-neutral-800 rounded-lg p-8 max-w-sm w-full relative">
            <button className="absolute top-4 right-4 text-neutral-400 text-2xl" onClick={() => setShowWithdrawModal(false)}>
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
