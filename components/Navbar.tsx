// src/9th-web-b/components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎬 MOVIE APP
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              홈
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className={isActive('/search') ? 'active' : ''}
            >
              검색
            </Link>
          </li>
          <li>
            <Link 
              to="/popular" 
              className={isActive('/popular') ? 'active' : ''}
            >
              인기
            </Link>
          </li>
          <li>
            <Link 
              to="/top-rated" 
              className={isActive('/top-rated') ? 'active' : ''}
            >
              높은 평점
            </Link>
          </li>
          <li>
            <Link 
              to="/upcoming" 
              className={isActive('/upcoming') ? 'active' : ''}
            >
              개봉 예정
            </Link>
          </li>
          <li>
            <Link 
              to="/now-playing" 
              className={isActive('/now-playing') ? 'active' : ''}
            >
              현재 상영중
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;