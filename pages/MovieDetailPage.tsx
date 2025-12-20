// src/9th-web-b/pages/MovieDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Movie } from '../types/movie';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        
        if (!apiKey) {
          throw new Error('API 키가 설정되지 않았습니다.');
        }
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '영화 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const handleImdbSearch = () => {
    if (movie) {
      window.open(`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`, '_blank');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="영화를 찾을 수 없습니다." />;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="movie-detail-page">
      {backdropUrl && (
        <div className="detail-backdrop">
          <img src={backdropUrl} alt={movie.title} />
        </div>
      )}
      
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>

        <div className="detail-content">
          <div className="detail-poster">
            <img src={imageUrl} alt={movie.title} />
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.original_title !== movie.title && (
              <p className="detail-original-title">{movie.original_title}</p>
            )}

            <div className="detail-meta">
              <span className="detail-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className="detail-votes">({movie.vote_count} 평가)</span>
              <span className="detail-date">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
            </div>

            <div className="detail-overview">
              <h3>줄거리</h3>
              <p>{movie.overview || '줄거리 정보가 없습니다.'}</p>
            </div>

            <button className="imdb-button" onClick={handleImdbSearch}>
              IMDb에서 검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;