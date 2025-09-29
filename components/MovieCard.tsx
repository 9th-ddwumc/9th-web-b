import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105 bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '200px', minHeight: '300px' }}
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
        <div className="w-full h-full flex items-center justify-center bg-gray-300">
          <div className="text-center p-4">
            <div className="text-gray-500 mb-2">이미지 없음</div>
            <div className="text-sm font-bold">{movie.title}</div>
          </div>
        </div>
      )}
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold text-center leading-snug mb-2">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300 text-center leading-relaxed overflow-hidden">
            {movie.overview?.substring(0, 150)}...
          </p>
          <div className="mt-2 text-xs text-yellow-400">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
}