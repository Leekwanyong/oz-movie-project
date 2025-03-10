import { Route, Routes } from 'react-router';
import Layout from './layout/Layout.jsx';
import Home from './pages/home/Home.jsx';
import Movies from './pages/movies/Movies.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
