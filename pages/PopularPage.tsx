import React, { useEffect, useState, useCallback } from 'react';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Movie } from '../types/movie';

const PopularPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. .env에서 키를 가져옵니다.
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        
        if (!apiKey) {
          throw new Error('API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
        }

        // 2. URL을 생성할 때 반드시 `백틱`을 사용하고 ${apiKey}를 넣어야 합니다.
        // 주소 끝에 cd8ba... 같은 글자가 직접 적혀있으면 안 됩니다!
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
        
        console.log("요청 URL 확인:", url); // 이 로그에서 47e5398...이 나오는지 확인하세요.

        const response = await fetch(url);

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

    fetchPopularMovies();
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
        <h1 className="page-title">🔥 인기 영화</h1>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <MovieList movies={movies} onMovieClick={handleMovieClick} />}
        <MovieModal movie={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default PopularPage;