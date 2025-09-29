import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ aspectRatio: '2/3' }}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={() => {
            console.log(`이미지 로딩 실패: ${movie.title}`);
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`이미지 로딩 성공: ${movie.title}`);
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <div className="text-center p-4">
            <div className="text-gray-400 mb-2">이미지 없음</div>
            <div className="text-sm font-bold text-white">{movie.title}</div>
          </div>
        </div>
      )}
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-end p-5 text-white transition-opacity duration-300">
          <h2 className="text-lg font-bold mb-2 leading-tight">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-2">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-yellow-400 font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">
              {movie.release_date}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}