import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        setError('');

        const apiKey = import.meta.env.VITE_TMDB_KEY;

        if (!apiKey) {
          throw new Error('API 키가 설정되지 않았습니다.');
        }

        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        setMovie(data);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? `영화 정보를 불러오는데 실패했습니다. (${
              err.response?.status || '네트워크 오류'
            })`
          : '영화 정보를 불러오는데 실패했습니다.';

        setError(errorMessage);
        console.error('Error fetching movie detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
          <strong className="font-bold">오류 발생!</strong>
          <span className="block mt-1">{error}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          돌아가기
        </button>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop with Gradient Overlay */}
      <div className="relative h-[500px] overflow-hidden">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition flex items-center gap-2"
        >
          <span className="text-xl">←</span>
          <span>돌아가기</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-64 rounded-xl shadow-2xl"
              />
            ) : (
              <div className="w-64 h-96 bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-8">
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-xl text-gray-400 italic mb-4">
                "{movie.tagline}"
              </p>
            )}

            {/* Rating and Release Date */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl text-yellow-400">⭐</span>
                <span className="text-2xl font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({movie.vote_count.toLocaleString()}명 평가)
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{movie.release_date}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{movie.runtime}분</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1 bg-purple-600 rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">줄거리</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview || '줄거리 정보가 없습니다.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">상태</h3>
                <p className="text-lg font-semibold">{movie.status}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">원제</h3>
                <p className="text-lg font-semibold">{movie.original_title}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">예산</h3>
                <p className="text-lg font-semibold">
                  {movie.budget > 0
                    ? `$${movie.budget.toLocaleString()}`
                    : '정보 없음'}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">수익</h3>
                <p className="text-lg font-semibold">
                  {movie.revenue > 0
                    ? `$${movie.revenue.toLocaleString()}`
                    : '정보 없음'}
                </p>
              </div>
            </div>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">제작사</h2>
                <div className="flex flex-wrap gap-6">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="text-center">
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="h-12 mb-2 object-contain bg-white p-2 rounded"
                        />
                      ) : (
                        <div className="h-12 mb-2 flex items-center">
                          <span className="text-gray-400 text-sm">
                            {company.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-20"></div>
    </div>
  );
}