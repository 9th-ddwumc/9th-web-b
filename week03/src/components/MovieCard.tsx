import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img className={`rounded-xl w-48 h-72 transition-all duration-300 filter ${isHovered ? "blur-md" : ""}`} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      {isHovered && (
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
          <p className="text-sm">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}
