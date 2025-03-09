import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Search from '../components/common/Icon/Search.jsx';
import useScroll from '../hook/useScroll.js';

function Header() {
  const scroll = useScroll();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOnOpenClick = () => {
    setOpen((prev) => !prev);
  };

  const handleOnFocus = () => {
    searchRef.current.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full ${scroll ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/50 to-transparent'}  px-6 py-4 z-50`}
    >
      <div className="flex items-center max-w-[1880px] mx-auto ">
        <Link to="/">
          <div className="text-[1.8rem] font-bold mr-12 text-primary cursor-pointer">OZFLEX</div>
        </Link>

        <nav className="w-[70%]">
          <ul className="flex items-center gap-6 text-lg text-white  ">
            <Link to="/">
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                홈
              </li>
            </Link>
            <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
              영화
            </li>
          </ul>
        </nav>

        <div className="relative flex items-center" onClick={handleOnFocus}>
          <input
            type="text"
            className={` absolute right-0 bg-black text-white outline-none transition-all duration-300 pl-10 pr-3 py-2 ${
              open ? 'min-w-60 opacity-100 border border-white' : 'min-w-0 opacity-0'
            }`}
            placeholder="검색..."
            onBlur={handleOnOpenClick}
            ref={searchRef}
          />

          <button
            className={`absolute right-0 text-gray-600 cursor-pointer transition-all duration-300 ${open ? ' -translate-x-52 ' : ' -translate-x-0'}`}
            onClick={handleOnOpenClick}
          >
            <Search />
          </button>
        </div>
        <ul className="flex items-center ml-4 gap-6   text-white text-sm cursor-pointer">
          <li className="hover:text-primary">로그인</li>
          <li className="hover:text-primary">회원가입</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
