import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6">홈페이지</h1>
      <div className="flex gap-4 justify-center">
        <Link to="/movies/popular" className="text-green-500">
          인기 영화
        </Link>
        <Link to="/movies/now_playing" className="text-green-500">
          현재 상영작
        </Link>
        <Link to="/movies/upcoming" className="text-green-500">
          개봉 예정작
        </Link>
      </div>
    </div>
  );
};
