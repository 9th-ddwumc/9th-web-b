import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkItem {
  to: string;
  label: string;
}

const links: LinkItem[] = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="flex gap-3 p-4">
      {links.map((linkItem) => (
        <NavLink
          key={linkItem.to}
          to={linkItem.to}
          className={({ isActive }) =>
            isActive
              ? "text-bedaB1 font-bold"
              : "text-gray-500"
          }
        >
          {linkItem.label}
        </NavLink>
      ))}
    </nav>
  );
};