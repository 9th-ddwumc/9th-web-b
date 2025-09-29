import { useState } from "react";
import "./App.css";
import MoviePage from "./pages/MoviePage";

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <MoviePage></MoviePage>;
}

export default App;
