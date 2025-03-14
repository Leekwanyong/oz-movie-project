import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getPopularMovies } from '../api/getMovieApi.js';

const CATEGORIES = ['now_playing', 'popular', 'top_rated', 'upcoming'];
function useGetQueriesData() {
  const userQueriesList = useQueries({
    queries: CATEGORIES.map((item) => {
      return {
        queryKey: ['slider', item],
        queryFn: async () => {
          return getPopularMovies(item);
        },
      };
    }),
  });

  const queriesData = useMemo(
    () => userQueriesList.map((item) => item.data?.results?.map((v) => v)),
    [userQueriesList]
  );
  return { data: CATEGORIES, queriesData };
}

export default useGetQueriesData;
