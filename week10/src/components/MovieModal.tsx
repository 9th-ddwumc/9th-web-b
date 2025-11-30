import type { Movie } from "../types/movies";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "/no-backdrop.jpg";

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-poster.jpg";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-white w-[850px] rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Header Backdrop */}
        <div className="h-60 w-full relative">
          <img src={backdropUrl} alt={movie.title} className="w-full h-full object-cover opacity-80" />
          <button onClick={onClose} className="absolute right-4 top-4 text-white text-3xl">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-3 gap-6">
          {/* Poster */}
          <div>
            <img src={posterUrl} alt={movie.title} className="rounded-xl shadow-lg" />
          </div>

          {/* Details */}
          <div className="col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-gray-500 text-sm">{movie.original_title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-semibold text-xl">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-600 text-sm">({movie.vote_count} 명의 평가)</span>
            </div>

            {/* Release date */}
            <div>
              <p className="text-gray-600 text-sm">개봉일</p>
              <p className="font-medium">{movie.release_date}</p>
            </div>

            {/* Popularity */}
            <div>
              <p className="text-gray-600 text-sm">인기도</p>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${Math.min(movie.popularity, 100)}%` }} />
              </div>
            </div>

            {/* Overview */}
            <div>
              <p className="text-gray-600 text-sm">줄거리</p>
              <p className="text-gray-800 leading-relaxed">{movie.overview || "줄거리 정보가 없습니다."}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <a href={`https://www.imdb.com/find?q=${movie.title}`} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                IMDb에서 검색
              </a>
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
