import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorDisplay } from "../components/ErrorDisplay";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        setIsError(false);

        const movieRes = await axios.get<MovieDetails>(
          `${TMDB_BASE_URL}/movie/${movieId}`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
          }
        );

        const creditsRes = await axios.get<Credits>(
          `${TMDB_BASE_URL}/movie/${movieId}/credits`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
          }
        );

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) fetchData();
  }, [movieId, TMDB_API_KEY, TMDB_BASE_URL]);

  if (isPending) return <LoadingSpinner />;
  if (isError || !movie)
    return <ErrorDisplay message="영화 정보를 불러오지 못했습니다." />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-2">개봉일: {movie.release_date}</p>
          <p className="mb-4">평점 ⭐ {movie.vote_average}</p>
          <p className="text-gray-700">{movie.overview}</p>
        </div>
      </div>

      {credits && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">출연진</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {credits.cast.slice(0, 10).map((c) => (
              <div key={c.id} className="text-center">
                {c.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${c.profile_path}`}
                    alt={c.name}
                    className="rounded-lg mx-auto mb-2"
                  />
                ) : (
                  <div className="w-24 h-36 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                )}
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
