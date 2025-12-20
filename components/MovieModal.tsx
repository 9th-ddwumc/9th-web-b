// src/9th-web-b/components/MovieModal.tsx
import React, { memo, useCallback } from 'react';
import type { Movie } from '../types/movie';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = memo(({ movie, isOpen, onClose }) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleImdbSearch = useCallback(() => {
    if (movie) {
      const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
      window.open(searchUrl, '_blank');
    }
  }, [movie]);

  if (!isOpen || !movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          {backdropUrl && (
            <div className="modal-backdrop-image">
              <img src={backdropUrl} alt={movie.title} />
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-poster">
            <img src={imageUrl} alt={movie.title} />
          </div>

          <div className="modal-info">
            <h2 className="modal-title">
              {movie.title}
              {movie.original_title !== movie.title && (
                <span className="modal-original-title">
                  {movie.original_title}
                </span>
              )}
            </h2>

            <div className="modal-meta">
              <div className="modal-rating">
                <span className="rating-score">{movie.vote_average.toFixed(1)}</span>
                <span className="rating-count">({movie.vote_count} 평가)</span>
              </div>
            </div>

            <div className="modal-details">
              <div className="modal-detail-item">
                <strong>개봉일</strong>
                <span>
                  {new Date(movie.release_date).getFullYear()}년{' '}
                  {new Date(movie.release_date).getMonth() + 1}월{' '}
                  {new Date(movie.release_date).getDate()}일
                </span>
              </div>

              <div className="modal-detail-item">
                <strong>인기도</strong>
                <span>{movie.popularity.toFixed(0)}</span>
              </div>
            </div>

            <div className="modal-overview">
              <strong>줄거리</strong>
              <p>{movie.overview || '줄거리 정보가 없습니다.'}</p>
            </div>

            <div className="modal-actions">
              <button className="btn-imdb" onClick={handleImdbSearch}>
                IMDb에서 검색
              </button>
              <button className="btn-close" onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MovieModal.displayName = 'MovieModal';

export default MovieModal;