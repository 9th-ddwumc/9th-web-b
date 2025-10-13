import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";

interface Person {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path?: string;
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<{ cast: Person[]; crew: Person[] } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const movieRes = await axios(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        });
        const creditsRes = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        });
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [id]);

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>로딩 중...</span>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-red-500">에러가 발생했습니다.</span>
      </div>
    );
  if (!movie) return null;

  // 감독만 crew에서 추출
  const directors = credits?.crew?.filter((p) => p.job === "Director");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* 배경 이미지를 가로로 꽉 채움 */}
      <div className="relative w-full h-[340px] flex items-end overflow-hidden">
        {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="배경" className="absolute inset-0 w-full h-full object-cover z-0" />}
        {/* 왼쪽은 어둡고 오른쪽은 밝아지는 그라데이션 오버레이 */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        {/* 왼쪽 정보 카드 */}
        <div className="relative z-20 w-full max-w-xl p-8">
          <h1 className="text-3xl font-extrabold mb-3 truncate">{movie.title}</h1>
          <div className="flex flex-col items-start space-y-0 mb-1">
            <div className="text-xs leading-tight">평점 {movie.vote_average}</div>
            <div className="text-xs leading-tight">{movie.runtime}분</div>
            <div className="text-xs leading-tight">{movie.release_date?.slice(0, 4)}</div>
          </div>
          {movie.tagline && <p className="italic mb-2 text-sm text-white-100">{movie.tagline}</p>}
          <p className="text-sm opacity-80 line-clamp-4 whitespace-pre-line mb-1">{movie.overview}</p>
        </div>
      </div>
      {/* 감독/출연진: 여러 줄 Grid, 가로로 꽉 차게 */}
      <div className="w-full px-0">
        <h2 className="text-2xl font-bold mb-4 px-6">감독/출연</h2>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-6">
          {/* 감독 */}
          {directors?.map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden mb-2 border-2 border-blue-400">
                {person.profile_path ? (
                  <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">no image</div>
                )}
              </div>
              <div className="text-center text-sm font-bold truncate max-w-[4.5rem]">{person.name}</div>
              <div className="text-center text-xs text-blue-400 truncate max-w-[4.5rem]">감독</div>
            </div>
          ))}
          {/* 출연진 */}
          {credits?.cast?.slice(0, 15).map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden mb-2 border-2 border-gray-600">
                {person.profile_path ? (
                  <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">no image</div>
                )}
              </div>
              <div className="text-center text-sm font-bold truncate max-w-[4.5rem]">{person.name}</div>
              <div className="text-center text-xs text-gray-400 truncate max-w-[4.5rem]">{person.character}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
