// src/9th-web-b/components/MovieList.tsx
import React, { memo } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = memo(({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
});

MovieList.displayName = 'MovieList';

export default MovieList;