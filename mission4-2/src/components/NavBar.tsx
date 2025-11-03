import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("userName") ?? "");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  // 사이드바 외 클릭 시 닫히기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    alert("로그아웃 되었습니다!");
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* 헤더 */}
      <div className="bg-black w-full flex items-center justify-between px-8 py-4 relative z-50 fixed top-0 w-full">
        {/* 왼쪽 영역: 햄버거 + 제목 로고 */}
        <div className="flex items-center">
          <button onClick={toggleMenu} className="w-10 h-10 flex items-center justify-center text-white focus:outline-none" aria-label="메뉴 토글">
            <svg width="32" height="32" viewBox="0 0 48 48">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
            </svg>
          </button>
          {/* 바로 옆 제목 */}
          <div className="text-pink-500 font-bold text-2xl tracking-tight ml-2">돌려돌려멍이판</div>
        </div>
        {/* 오른쪽 - 유저 영역 */}
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-white text-base">{userName ? userName + "님 반갑습니다." : "마이페이지"}</span>
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
      {/* 헤더 아래에서 시작하는 사이드바 */}
      {menuOpen && (
        <div ref={menuRef} className="fixed left-0 top-[72px] w-56 h-[calc(100vh-72px)] bg-neutral-900 px-6 pt-8 z-50 flex flex-col">
          <nav className="flex flex-col gap-4 text-white text-base">
            <NavLink to="/search" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
              찾기
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/mypage" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
                마이페이지
              </NavLink>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
                  로그인
                </NavLink>
                <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
                  회원가입
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default NavBar;
