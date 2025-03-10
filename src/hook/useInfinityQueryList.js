import { useInfiniteQuery } from '@tanstack/react-query';
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
  return {
    isLoading: infiniteQuery.isLoading ?? false,
    data: infiniteQuery.data?.pages ?? [],
    isFetchingNextPage: infiniteQuery.isFetchingNextPage ?? false,
    fetchNextPage: infiniteQuery.fetchNextPage ?? (() => {}),
    hasNextPage: infiniteQuery.hasNextPage ?? false,
  };
}

export default useInfinityQueryList;
