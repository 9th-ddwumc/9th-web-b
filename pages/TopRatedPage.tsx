// src/9th-web-b/pages/TopRatedPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Movie } from '../types/movie';

const TopRatedPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        
        if (!apiKey) {
          throw new Error('API 키가 설정되지 않았습니다.');
        }
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '영화를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  return (
    <div className="movie-page">
      <div className="container">
        <h1 className="page-title">⭐ 높은 평점 영화</h1>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <MovieList movies={movies} onMovieClick={handleMovieClick} />}

        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default TopRatedPage;