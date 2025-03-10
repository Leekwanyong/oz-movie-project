import { useMemo } from 'react';
import InfiniteScrollMovieCard from '../../components/common/card/InfiniteScrollMovieCard.jsx';
import useInfinityQueryList from '../../hook/useInfinityQueryList.js';
import useIntersectionObserver from '../../hook/useIntersectionObserver.js';

function Movies() {
  const { data, fetchNextPage, hasNextPage } = useInfinityQueryList();
  const ref = useIntersectionObserver(hasNextPage, fetchNextPage);
  const allMovieData = useMemo(
    () => data?.flatMap((v) => v.results.filter((a) => a.adult === false)) || [],
    [data]
  );

  return (
    <div className="mt-28 grid grid-cols-4 items-center justify-between gap-4">
      {allMovieData.map((v, i) => (
        <InfiniteScrollMovieCard key={v.id} item={v} />
      ))}
      {hasNextPage && <div ref={ref} className="h-[8rem] bg-red-500" />}
    </div>
  );
}

export default Movies;
