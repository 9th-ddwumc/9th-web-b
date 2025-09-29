import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data = [] } = await axios(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      });

      setMovies(data.results);
    };

    fetchMovies();
  }, []);
  console.log(movies);

  return (
    <div className="w-full flex justify-center">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center max-w-screen-xl w-full p-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
