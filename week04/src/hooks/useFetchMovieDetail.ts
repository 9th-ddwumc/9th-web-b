import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";

interface Person {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string;
}

interface MovieDetailResponse {
  movie: Movie | null;
  credits: { cast: Person[]; crew: Person[] } | null;
  isPending: boolean;
  isError: boolean;
}

export function useFetchMovieDetail(id: string | undefined) {
  const [detail, setDetail] = useState<MovieDetailResponse>({
    movie: null,
    credits: null,
    isPending: false,
    isError: false,
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setDetail((prev) => ({ ...prev, isPending: true, isError: false }));

      try {
        const movieRes = await axios(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        });
        const creditsRes = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        });

        setDetail({
          movie: movieRes.data,
          credits: creditsRes.data,
          isPending: false,
          isError: false,
        });
      } catch {
        setDetail((prev) => ({ ...prev, isPending: false, isError: true }));
      }
    };

    fetchData();
  }, [id]);

  return detail; // movie, credits, isPending, isError 반환
}
