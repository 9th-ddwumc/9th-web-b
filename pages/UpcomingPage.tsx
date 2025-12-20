import MovieList from "../components/MovieList";

export default function UpcomingPage() {
  return <MovieList endpoint="movie/upcoming" title="개봉 예정 영화" />;
}