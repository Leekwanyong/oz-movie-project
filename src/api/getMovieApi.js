import axios from 'axios';

const { VITE_TMDB_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

export const getPopularMovies = async (category) => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}movie/${category}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
  );

  return response.data;
};

export const getMovieVideo = async (movieId) => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}movie/${movieId}/videos?api_key=${VITE_TMDB_API_KEY}&language=eu-US`
  );

  return response.data;
};
