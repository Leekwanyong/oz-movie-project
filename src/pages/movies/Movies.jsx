import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getSearchMovies } from '../../api/getMovieApi.js';
import InfiniteScrollMovieCard from '../../components/common/card/InfiniteScrollMovieCard.jsx';
import useInfinityQueryList from '../../hook/useInfinityQueryList.js';
import useIntersectionObserver from '../../hook/useIntersectionObserver.js';

function Movies() {
  const { infiniteData, fetchNextPage, hasNextPage } = useInfinityQueryList();
  const ref = useIntersectionObserver(hasNextPage, fetchNextPage);
  const [searchParam] = useSearchParams();
  const { data } = useQuery({
    queryKey: ['search', searchParam.get('query')],
    queryFn: () => getSearchMovies(searchParam.get('query')),
    enabled: searchParam.get('query') !== null,
  });

  return (
    <div className="mt-28 grid grid-cols-4 items-center justify-between gap-4">
      {searchParam.get('query') ? (
        data?.results?.length > 0 ? (
          data.results.map((item) => <InfiniteScrollMovieCard key={item.id} item={item} />)
        ) : (
          <p>검색 결과가 없습니다.</p>
        )
      ) : (
        infiniteData.map((item, i) => (
          <InfiniteScrollMovieCard key={item.id + '-' + i} item={item} />
        ))
      )}
      {hasNextPage && <div ref={ref} className="h-[7rem] " />}
    </div>
  );
}

export default Movies;
