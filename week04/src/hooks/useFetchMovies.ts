import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";

export function useFetchMovies(category: string, page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setMovies(Array.isArray(data?.results) ? data.results : []);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  return { movies, isPending, isError };
}
