import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "홈" },
    { path: "/popular", label: "인기 영화" },
    { path: "/top-rated", label: "평점 높은" },
    { path: "/upcoming", label: "개봉 예정" },
    { path: "/now-playing", label: "상영 중" },
  ];

  return (
    <nav className="bg-transparent pt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-start">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `py-2 px-4 text-sm font-medium transition duration-300 ${
                    isActive
                      ? "text-green-500 font-bold"
                      : "text-gray-600 hover:text-gray-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}