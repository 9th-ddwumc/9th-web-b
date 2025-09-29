import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import Pagination from "./Pagination";

interface MovieListProps {
  endpoint: string;
  title: string;
}

export default function MovieList({ endpoint, title }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (page: number) => {
    try {
      setIsLoading(true);
      setError("");
      
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      
      if (!apiKey) {
        throw new Error("API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
      }
      
      console.log("Fetching movies from:", `https://api.themoviedb.org/3/${endpoint}`);
      
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/${endpoint}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      
      console.log("Movies fetched:", data.results.length);
      setMovies(data.results);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? `영화 데이터를 불러오는데 실패했습니다. (${err.response?.status || '네트워크 오류'})`
        : "영화 데이터를 불러오는데 실패했습니다.";
      
      setError(errorMessage);
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, endpoint]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-6 py-4">
      <Pagination
        currentPage={currentPage}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
      
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}