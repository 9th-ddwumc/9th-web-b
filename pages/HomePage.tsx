// src/9th-web-b/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-hero">
          <h1>🎬 영화 검색 앱에 오신 것을 환영합니다</h1>
          <p>원하는 영화를 검색하고, 인기 영화를 탐색해보세요!</p>
        </div>

        <div className="home-categories">
          <Link to="/search" className="category-card">
            <div className="category-icon">🔍</div>
            <h3>영화 검색</h3>
            <p>제목으로 영화를 검색하세요</p>
          </Link>

          <Link to="/popular" className="category-card">
            <div className="category-icon">🔥</div>
            <h3>인기 영화</h3>
            <p>현재 인기있는 영화들</p>
          </Link>

          <Link to="/top-rated" className="category-card">
            <div className="category-icon">⭐</div>
            <h3>높은 평점</h3>
            <p>평점이 높은 영화들</p>
          </Link>

          <Link to="/upcoming" className="category-card">
            <div className="category-icon">📅</div>
            <h3>개봉 예정</h3>
            <p>곧 개봉할 영화들</p>
          </Link>

          <Link to="/now-playing" className="category-card">
            <div className="category-icon">🎥</div>
            <h3>현재 상영중</h3>
            <p>극장에서 상영중인 영화들</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;