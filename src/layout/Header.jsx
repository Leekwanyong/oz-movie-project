import { Link } from 'react-router';
import useScroll from '../hook/useScroll.js';
import SearchBar from '../pages/home/SearchBar.jsx';

function Header() {
  const scroll = useScroll();

  return (
    <header
      className={`fixed top-0 left-0 w-full ${scroll ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/50 to-transparent'}  px-6 py-4 z-10`}
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
            <Link to="/movies">
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                영화
              </li>
            </Link>
          </ul>
        </nav>
        <SearchBar />
        <ul className="flex items-center ml-4 gap-6   text-white text-sm cursor-pointer">
          <li className="hover:text-primary">로그인</li>
          <li className="hover:text-primary">회원가입</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
