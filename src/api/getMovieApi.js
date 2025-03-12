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
    `${VITE_TMDB_BASE_URL}movie/${movieId}/videos?api_key=${VITE_TMDB_API_KEY}&language=en-US`
  );

  return response.data;
};

export const getMovieDetail = async (movieId) => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
  );

  return response.data;
};

export const getMovieList = async (pageParam = 1) => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}discover/movie?api_key=${VITE_TMDB_API_KEY}&include_adult=false&language=ko-KR&page=${pageParam}`
  );

  return response.data;
};

export const getSearchMovies = async (value) => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}search/movie?query=${value}&api_key=${VITE_TMDB_API_KEY}&include_adult=false&language=ko-KR`
  );

  return response.data;
};
