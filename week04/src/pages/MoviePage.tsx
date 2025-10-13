import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useFetchMovies } from "../hooks/useFetchMovies";

export default function MoviePage() {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  const { movies, isPending, isError } = useFetchMovies(category || "popular", page);

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
      <div className="grid gap-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-6xl mx-auto p-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
