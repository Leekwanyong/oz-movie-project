const { VITE_TMDB_BASE_URL, VITE_TMDB_API_KEY } = import.meta.env;

const fetchWithErrorHandling = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 호출 오류: ${response.status}`);
  }

  return response.json();
};

export const getPopularMovies = async (category) => {
  return fetchWithErrorHandling(
    `${VITE_TMDB_BASE_URL}movie/${category}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
  );
};

export const getMovieVideo = async (movieId) => {
  return fetchWithErrorHandling(
    `${VITE_TMDB_BASE_URL}movie/${movieId}/videos?api_key=${VITE_TMDB_API_KEY}&language=en-US`
  );
};

export const getMovieDetail = async (movieId) => {
  return fetchWithErrorHandling(
    `${VITE_TMDB_BASE_URL}movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&language=ko-KR`
  );
};

export const getMovieList = async (pageParam = 1) => {
  return fetchWithErrorHandling(
    `${VITE_TMDB_BASE_URL}discover/movie?api_key=${VITE_TMDB_API_KEY}&include_adult=false&language=ko-KR&page=${pageParam}`
  );
};

export const getSearchMovies = async (value) => {
  return fetchWithErrorHandling(
    `${VITE_TMDB_BASE_URL}search/movie?query=${value}&api_key=${VITE_TMDB_API_KEY}&include_adult=false&language=ko-KR`
  );
};
