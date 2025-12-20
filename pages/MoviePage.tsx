// src/9th-web-b/pages/MoviePage.tsx
import React, { useState, useCallback, useMemo } from 'react';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Movie } from '../types/movie';
import useCustomFetch from '../hooks/useCustomFetch';

const MoviePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  
  // API 키 확인
  if (!apiKey) {
    console.error('API 키가 설정되지 않았습니다!');
  }
  
  const apiUrl = useMemo(() => {
    if (!searchQuery || !apiKey) return null;
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&language=${language}&include_adult=${includeAdult}`;
  }, [searchQuery, language, includeAdult, apiKey]);

  const { data, loading, error, fetchData } = useCustomFetch<{ results: Movie[] }>(apiUrl);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      fetchData();
    }
  }, [searchQuery, fetchData]);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  const movies = useMemo(() => {
    if (!data || !data.results) return [];
    return data.results;
  }, [data]);

  return (
    <div className="movie-page">
      <div className="container">
        <SearchForm
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          includeAdult={includeAdult}
          onIncludeAdultChange={setIncludeAdult}
          language={language}
          onLanguageChange={setLanguage}
          onSearch={handleSearch}
        />

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && data && <MovieList movies={movies} onMovieClick={handleMovieClick} />}

        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default MoviePage;