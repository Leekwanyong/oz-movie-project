import { useMemo } from 'react';

function useVideoFilter(data) {
  return useMemo(() => [data?.results?.filter((v) => v.type === 'Trailer')[0]], [data]);
}

export default useVideoFilter;
