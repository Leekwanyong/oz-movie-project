import { useEffect, useState } from 'react';

function useDebounce(value, delay = 3000) {
  const [debounce, setDebounce] = useState('');

  useEffect(() => {
    const debounced = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(debounced);
  }, [value]);

  return debounce;
}

export default useDebounce;
