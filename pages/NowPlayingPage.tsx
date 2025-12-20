import MovieList from "../components/MovieList";

export default function NowPlayingPage() {
  return <MovieList endpoint="movie/now_playing" title="상영 중인 영화" />;
}