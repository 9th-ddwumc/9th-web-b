import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout: React.FC = () => {
  const location = useLocation();

  // 홈('/')에서는 Navbar 숨김
  const hideNavbar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideNavbar && <Navbar />} {/* 홈 제외하고만 Navbar 렌더링 */}
      <main className="flex-1">
        <Outlet /> {/* 하위 페이지(Movies, Details 등)가 여기에 표시됨 */}
      </main>
    </div>
  );
};
