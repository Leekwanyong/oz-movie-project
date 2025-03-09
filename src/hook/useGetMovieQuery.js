import { useQuery } from '@tanstack/react-query';
import { getMovieVideo } from '../api/getMovieApi.js';

// HomeVideo
export function useGetMovieQuery(random) {
  const { data } = useQuery({
    queryKey: ['heroVideo'],
    queryFn: () => getMovieVideo(random),
  });

  return data;
}

// ModalVideo
export function useModalVideoQuery(movieId) {
  const { data } = useQuery({
    queryKey: ['modalVideo'],
    queryFn: () => getMovieVideo(movieId),
  });
  return data;
}
