import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetail, Credits } from "../types/movieDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const apiKey = import.meta.env.VITE_TMDB_KEY;

        if (!apiKey) {
          throw new Error("API 키가 설정되지 않았습니다.");
        }

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          ),
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? `영화 정보를 불러오는데 실패했습니다. (${
              err.response?.status || "네트워크 오류"
            })`
          : "영화 정보를 불러오는데 실패했습니다.";

        setError(errorMessage);
        console.error("Error fetching movie data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return <ErrorMessage message="영화 정보를 찾을 수 없습니다." />;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const director = credits?.crew.find((person) => person.job === "Director");
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
          backgroundColor: backdropUrl ? undefined : "#1f2937",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-gray-300 italic">{movie.tagline}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">포스터 없음</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">영화 정보</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">개봉일:</span>{" "}
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold">러닝타임:</span>{" "}
                  {movie.runtime}분
                </p>
                <p>
                  <span className="font-semibold">평점:</span> ⭐{" "}
                  {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()}명)
                </p>
                <p>
                  <span className="font-semibold">장르:</span>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </p>
                {director && (
                  <p>
                    <span className="font-semibold">감독:</span> {director.name}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">줄거리</h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            {mainCast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">주요 출연진</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mainCast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            사진 없음
                          </span>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-800">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-600">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}