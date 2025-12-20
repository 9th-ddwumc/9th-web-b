// src/9th-web-b/components/MovieCard.tsx
import React, { memo } from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;

  return (
    <div
      className="movie-card"
      onClick={() => onClick(movie)}
      style={{ cursor: 'pointer' }}
    >
      <div className="movie-card-image">
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-card-rating">
          {movie.vote_average?.toFixed(1) || 'N/A'}
        </div>
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title || '제목 없음'}</h3>
        {releaseDate && (
          <p className="movie-card-date">
            {releaseDate.getFullYear()}년{' '}
            {releaseDate.getMonth() + 1}월{' '}
            {releaseDate.getDate()}일
          </p>
        )}
        <p className="movie-card-overview">
          {movie.overview ? (
            <>
              {movie.overview.slice(0, 100)}
              {movie.overview.length > 100 ? '...' : ''}
            </>
          ) : (
            '줄거리 정보가 없습니다.'
          )}
        </p>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;