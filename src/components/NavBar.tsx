import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영중" },
  { to: "/movies/top_rated", label: "평점 높은 영화" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

export const NavBar = () => {
  return (
    <div className="flex gap-3 p-4">
      {navLinks.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "text-[#b2dab1] font-bold" : "text-gray-500")}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};