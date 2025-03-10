import { useQueries } from '@tanstack/react-query';
import { getPopularMovies } from '../api/getMovieApi.js';

const CATEGORIES = ['now_playing', 'popular', 'top_rated', 'upcoming'];
function useGetQueriesData() {
  const userQueriesList = useQueries({
    queries: CATEGORIES.map((item) => {
      return {
        queryKey: ['slider', item],
        queryFn: async () => {
          return await getPopularMovies(item);
        },
      };
    }),
  });
  return { CATEGORIES, userQueriesList };
}

export default useGetQueriesData;
