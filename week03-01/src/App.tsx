import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>홈 화면</h2>;
}

function About() {
  return <h2>소개 화면</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
