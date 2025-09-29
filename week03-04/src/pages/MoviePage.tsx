import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorDisplay } from '../components/ErrorDisplay';
import MovieCard from '../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const MoviePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL =
    import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get<MovieResponse>(
          `${TMDB_BASE_URL}/movie/${category}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('데이터 로딩 중 에러 발생:', error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (category) {
      fetchMovies();
    }
  }, [category, page, TMDB_API_KEY, TMDB_BASE_URL]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay message="영화를 불러오지 못했습니다." />;

  return (
    <div className="w-full">
      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          {`<`}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>

      {/* 영화 카드 리스트 */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto p-10">
        {movies?.length ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ 상세 페이지 이동
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <MovieCard movie={movie as any} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">영화를 불러오지 못했습니다.</p>
        )}
      </div>
    </div>
  );
};
