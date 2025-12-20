// src/9th-web-b/App.tsx (임시 디버그 버전)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import PopularPage from './pages/PopularPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import NowPlayingPage from './pages/NowPlayingPage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  // API 키 확인
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  console.log('API Key loaded:', apiKey ? '✅ Yes' : '❌ No');
  console.log('API Key length:', apiKey?.length || 0);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<MoviePage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/now-playing" element={<NowPlayingPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;