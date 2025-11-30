import useFetch from "../hooks/useFetch";
import type { MovieResponse, MovieFilters } from "../types/movies";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => {
    return {
      params: filters,
    };
  }, [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", axiosRequestConfig);

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data);
  return (
    <div className="container">
      <MovieFilter onChange={setFilters} />
      {isLoading ? <div>로딩 중 입니다...</div> : <MovieList movies={data?.results || []} />}
    </div>
  );
}
