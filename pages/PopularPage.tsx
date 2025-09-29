import MovieList from "../components/MovieList";

export default function PopularPage() {
  return <MovieList endpoint="movie/popular" title="인기 영화" />;
}