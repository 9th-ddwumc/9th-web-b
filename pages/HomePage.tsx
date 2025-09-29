import MovieList from "../components/MovieList";

export default function HomePage() {
  return <MovieList endpoint="movie/popular" title="인기 영화" />;
}