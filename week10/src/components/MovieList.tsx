import MovieCard from "./MovieCard";
import type { Movie } from "../types/movies";
import MovieModal from "./MovieModal";
import { useState } from "react";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* 영화 카드 목록 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)} // <-- 여기 추가!
          />
        ))}
      </div>

      {/* 모달 */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)} // 닫기 기능
      />
    </>
  );
};

export default MovieList;
