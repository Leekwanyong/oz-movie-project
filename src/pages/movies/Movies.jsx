import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getSearchMovies } from '../../api/getMovieApi.js';
import InfiniteScrollMovieCard from '../../components/common/card/InfiniteScrollMovieCard.jsx';
import SkeletonCard from '../../components/common/card/SkeletonCard.jsx';
import useInfinityQueryList from '../../hook/useInfinityQueryList.js';
import useIntersectionObserver from '../../hook/useIntersectionObserver.js';
import useResponsiveSkeletonCount from '../../hook/useResponsiveSkeletonCount.js';

function Movies() {
  const { infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinityQueryList();
  const ref = useIntersectionObserver(hasNextPage, fetchNextPage);
  const skeletonCount  = useResponsiveSkeletonCount('infinity');
  const [searchParam] = useSearchParams();
  const { data } = useQuery({
    queryKey: ['search', searchParam.get('query')],
    queryFn: () => getSearchMovies(searchParam.get('query')),
    enabled: searchParam.get('query') !== null,
  });

  const movies = searchParam.get('query') ? data?.results?.length : infiniteData;
  const isEmptySearch = searchParam.get('query') !== null && data?.results?.length === 0;

  return (
    <div className="mt-28 grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4">
      {movies?.map((movie, i) => (
          <InfiniteScrollMovieCard key={movie.id + '-' + i} item={movie} />
        )
      )}
      {isEmptySearch && <p>검색 결과가 없습니다.</p>}
      {isFetchingNextPage && Array.from({length: skeletonCount }).map((_, i) => (<SkeletonCard key={i}/>))}
      {hasNextPage && <div ref={ref} className="h-[25%] " />}
    </div>
  );
}

export default Movies;
