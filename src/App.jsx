import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './layout/Layout.jsx';
import NotFound from './pages/NotFound.jsx';

const Home = lazy(() => import('./pages/home/Home.jsx'));
const Movies = lazy(() => import('./pages/movies/Movies.jsx'));
const Modal = lazy(() => import('./components/common/card/Modal.jsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movieDetailModal/:id" element={<Modal />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
