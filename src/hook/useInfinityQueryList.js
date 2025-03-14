import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { getMovieList } from '../api/getMovieApi.js';

function useInfinityQueryList() {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['moviesInfinite'],
    queryFn: ({ pageParam = 1 }) => getMovieList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const allMovieData = useMemo(() => {
    if (!infiniteQuery.data?.pages) return [];

    const map = new Map();
    infiniteQuery.data?.pages.reduce((_, page) => {
      page.results.forEach(
        (result) => {
          if (!result.adult) {
            map.set(result.id, result);
          }
          return map;
        },
        [map]
      );
    });
    return Array.from(map.values());
  }, [infiniteQuery.data?.pages]);

  const loadMoreMovies = useCallback(() => {
    if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
      infiniteQuery.fetchNextPage();
    }
  }, [infiniteQuery.hasNextPage, infiniteQuery.isFetchingNextPage]);

  return {
    isLoading: infiniteQuery.isLoading,
    infiniteData: allMovieData,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    fetchNextPage: loadMoreMovies,
    hasNextPage: infiniteQuery.hasNextPage,
  };
}

export default useInfinityQueryList;
