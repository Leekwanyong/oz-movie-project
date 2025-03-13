import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './layout/Layout.jsx';
import Login from './pages/login/Login.jsx';
import SingUp from './pages/login/SingUp.jsx';
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
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
