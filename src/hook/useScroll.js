import { useEffect, useState } from 'react';

function useScroll() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    let timer = null;

    const handleScroll = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = window.setTimeout(() => {
        if (window.scrollY > 0) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scroll;
}

export default useScroll;
