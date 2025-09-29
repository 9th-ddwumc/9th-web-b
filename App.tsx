/*import MoviePage from "./pages/MoviePage";

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <MoviePage></MoviePage>;
}

export default App;mission01*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import UpcomingPage from "./pages/UpcomingPage";
import NowPlayingPage from "./pages/NowPlayingPage";

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="popular" element={<PopularPage />} />
          <Route path="top-rated" element={<TopRatedPage />} />
          <Route path="upcoming" element={<UpcomingPage />} />
          <Route path="now-playing" element={<NowPlayingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;