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
      <img className={`rounded-xl w-48 h-72 transition-all duration-300 ${isHovered ? "blur-sm" : ""}`} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      {isHovered && (
        <div className="absolute inset-0 bg-black">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      )}
    </div>
  );
}
