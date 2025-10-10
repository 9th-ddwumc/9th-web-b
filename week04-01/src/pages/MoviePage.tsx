import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";
import MovieCard from "../components/MovieCard";
import type { MovieResponse } from "../types/movie";
import { useCustomFetch } from "../hooks/customHook";

export const MoviePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);

  const { data, isPending, isError } = useCustomFetch<MovieResponse>(
    `/movie/${category}`,
    page
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay message="영화를 불러오지 못했습니다" />;

  return (
    <div className="w-full">
      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          {"<"}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      {/* 영화 카드 리스트 */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto p-10">
        {data?.results?.length ? (
          data.results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            영화를 불러오지 못했습니다.
          </p>
        )}
      </div>
    </div>
  );
};
