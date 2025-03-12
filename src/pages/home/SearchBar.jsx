import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Search from '../../components/common/Icon/Search.jsx';
import useDebounce from '../../hook/useDebounce.js';

const DELAY = 2000;
function SearchBar() {
  const searchRef = useRef(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, DELAY);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearch === '') {
      setSearchParams({});
    } else {
      setSearchParams({ query: debouncedSearch });
      navigate(`/movies?query=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  const handleOnClick = (e) => {
    if (e.relatedTarget && e.relatedTarget.closest('button')) {
      return null;
    }
    setOpen(search.trim() !== '');
  };

  const handleOnOpenClick = () => {
    setOpen(true);
  };

  const handleOnFocus = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <div className="relative flex items-center" onClick={handleOnFocus}>
      <input
        type="text"
        className={` absolute right-0 bg-black text-white outline-none transition-all duration-300 pl-10 pr-3 py-2 ${
          open ? 'min-w-60 opacity-100 border border-white' : 'min-w-0 opacity-0'
        }`}
        placeholder="검색..."
        onBlur={handleOnClick}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchRef}
      />

      <button
        className={`absolute right-0 text-gray-600 cursor-pointer transition-all duration-300 ${open ? ' -translate-x-52 ' : ' -translate-x-0'}`}
        onClick={handleOnOpenClick}
      >
        <Search />
      </button>
    </div>
  );
}

export default SearchBar;
