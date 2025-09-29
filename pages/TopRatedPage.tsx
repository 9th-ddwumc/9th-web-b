import MovieList from "../components/MovieList";

export default function TopRatedPage() {
  return <MovieList endpoint="movie/top_rated" title="평점 높은 영화" />;
}