import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getMovieList } from '../api/getMovieApi.js';

function useInfinityQueryList() {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['moviesInfinite'],
    queryFn: ({ pageParam = 1 }) => getMovieList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  const allMovieData = useMemo(
    () =>
      infiniteQuery.data?.pages?.flatMap((v) => v.results.filter((a) => a.adult === false)) || [],
    [infiniteQuery]
  );

  return {
    isLoading: infiniteQuery.isLoading ?? false,
    infiniteData: allMovieData,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage ?? false,
    fetchNextPage: infiniteQuery.fetchNextPage ?? (() => {}),
    hasNextPage: infiniteQuery.hasNextPage ?? false,
  };
}

export default useInfinityQueryList;
