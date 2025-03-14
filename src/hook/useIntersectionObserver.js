import { useCallback, useEffect, useRef } from 'react';

function useIntersectionObserver(hasNextPage, fetchNextPage) {
  const observerRef = useRef(null);

  const callback = useCallback(() => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.5 }
    );
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!observerRef.current) {
      return undefined;
    }

    const observer = callback();
    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observerRef, callback]);
  return observerRef;
}

export default useIntersectionObserver;
