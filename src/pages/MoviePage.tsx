import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie.ts";
import MovieCard from "../components/MovieCard.tsx";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]); // 초기값 빈 배열
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    if (!category) return;
    const fetchMovies = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios(`https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setMovies(Array.isArray(data?.results) ? data.results : []); // 항상 배열로 처리
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center items-center">
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto p-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}