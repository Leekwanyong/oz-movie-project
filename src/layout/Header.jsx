import { useState } from 'react';
import { Link } from 'react-router';
import useScroll from '../hook/useScroll.js';
import SearchBar from '../pages/home/SearchBar.jsx';

function Header() {
  const scroll = useScroll();
  const [open, setOpen] = useState(false);

  const handleOnToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <header
      className={`fixed top-0 left-0 w-full ${scroll ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/50 to-transparent'}  px-6 py-4 z-10`}
    >
      <div className="flex items-center max-w-[1880px] mx-auto ">
        <Link to="/">
          <div className="text-[1.8rem] font-bold mr-12 text-primary cursor-pointer">OZFLEX</div>
        </Link>

        <nav className={`w-[70%] hidden lg:block `}>
          <ul className="flex items-center gap-6 text-lg text-white  ">
            <Link to="/">
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                홈
              </li>
            </Link>
            <Link to="/movies">
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                영화
              </li>
            </Link>
          </ul>
        </nav>
        <div className="block ml-auto">
          <SearchBar />
        </div>
        <ul className="hidden lg:flex items-center ml-4 gap-6     text-white text-sm cursor-pointer">
          <li className="hover:text-primary">로그인</li>
          <li className="hover:text-primary">회원가입</li>
        </ul>
        <button onClick={handleOnToggle} className={` lg:hidden ml-4`}>
          {open ? 'x' : <p>Menu</p>}
        </button>
      </div>
      <div
        className={`lg:hidden fixed top-[10%] left-0 w-full  bg-black/90 flex flex-col items-center justify-center transition-transform duration-300 ${
          open
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg text-white">
          <Link to="/" className="hover:text-primary" onClick={() => setOpen(false)}>
            홈
          </Link>
          <Link to="/movies" className="hover:text-primary" onClick={() => setOpen(false)}>
            영화
          </Link>
          <Link to="/login" className="hover:text-primary" onClick={() => setOpen(false)}>
            로그인
          </Link>
          <Link to="/signup" className="hover:text-primary" onClick={() => setOpen(false)}>
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
