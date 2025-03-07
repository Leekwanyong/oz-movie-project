import axios from 'axios';

const { VITE_TMDB_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;
const getPopularMovies = async () => {
  const response = await axios.get(
    `${VITE_TMDB_BASE_URL}movie/popular?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
  );
  return response.data.results;
};

export default getPopularMovies;
