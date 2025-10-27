import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="bg-black w-full flex items-center justify-between px-6 py-3">
      <div className="text-pink-500 font-bold text-lg">돌려돌려 멍이판!</div>
      <div className="flex gap-2">
        <NavLink to="/login" className="bg-neutral-900 text-white px-3 py-1 rounded text-sm font-medium hover:bg-neutral-700 transition">
          로그인
        </NavLink>
        <NavLink to="/signup" className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-pink-600 transition">
          회원가입
        </NavLink>
      </div>
    </div>
  );
};
