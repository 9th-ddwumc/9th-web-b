import { useState } from "react";
import type { Movie } from "../types/movie";
import { useNavigate, useParams } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <div
      className="w-48 h-72 rounded-xl border-4 border-white shadow-lg overflow-hidden relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movies/${category}/${movie.id}`)}
    >
      <img
        className={`w-full h-full object-cover transition-all duration-300 filter ${isHovered ? "blur-md" : ""}`}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />

      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-white">
          <h2 className="text-lg font-bold mb-2 text-center drop-shadow-lg">{movie.title}</h2>
          <p className="text-sm text-center drop-shadow-lg line-clamp-5">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}