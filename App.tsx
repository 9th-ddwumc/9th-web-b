import React from 'react';
import { Link } from './router/Link';
import { Route } from './router/Route';
import { Routes } from './router/Routes';

import MatthewPage from './pages/MatthewPage';
import AeongPage from './pages/AeongPage';
import JoyPage from './pages/JoyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <nav>
        <Link to="/matthew">Matthew</Link> |{" "}
        <Link to="/aeong">Aeong</Link> |{" "}
        <Link to="/joy">Joy</Link> |{" "}
        <Link to="/not-found">Not Found</Link>
      </nav>

      <Routes>
        <Route path="/matthew" component={MatthewPage} />
        <Route path="/aeong" component={AeongPage} />
        <Route path="/joy" component={JoyPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </div>
  );
}

export default App;
