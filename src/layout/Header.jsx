import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import useScroll from '../hook/useScroll.js';
import SearchBar from '../pages/home/SearchBar.jsx';
import { darkModeType } from '../redux/store/DarkModeSlice.js';
import { OnLogout } from '../redux/store/LoginSlice.js';
import LogoutThunk from '../redux/thunk/LogoutThunk.js';

function Header() {
  const scroll = useScroll();
  const [open, setOpen] = useState(false);
  const dark = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.OnLogin);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(LogoutThunk());
    dispatch(OnLogout());
  };

  const handleOnToggle = () => {
    setOpen((prev) => !prev);
  };

  const userMeta = login.user?.user_metadata;
  const profileImg = userMeta?.avatar_url || userMeta?.picture;

  return (
    <header
      className={`fixed  top-0 left-0 w-full ${scroll ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/50 to-transparent'}  px-6 py-4 z-10`}
    >
      <div className="flex items-center max-w-[1880px] mx-auto ">
        <Link to="/">
          <div className="text-[1.8rem] font-bold mr-12 text-primary cursor-pointer">OZFLEX</div>
        </Link>

        <nav className={`w-[70%] hidden lg:block `}>
          <ul className="flex items-center gap-6 text-lg text-white  ">
            <button onClick={() => navigate('/')}>
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                홈
              </li>
            </button>
            <button onClick={() => navigate('/movies')}>
              <li className="cursor-pointer hover:text-gray-300 transition-colors hover:text-primary">
                영화
              </li>
            </button>
          </ul>
        </nav>
        <div className="block ml-auto">
          <SearchBar />
        </div>
        <button
          className="p-2  bg-gray-200 dark:bg-gray-700  ml-4"
          onClick={() => dispatch(darkModeType())}
        >
          {dark ? '🌙' : '☀️'}
        </button>
        <ul className="hidden lg:flex items-center ml-4 gap-8     text-white text-sm cursor-pointer">
          <li className="hover:text-primary">
            {userMeta ? (
              <div className="flex items-center gap-8">
                <img src={profileImg} className="w-10 h-10 rounded-full" alt="프로필 이미지" />
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button>로그인</button>
              </Link>
            )}

          </li>
          <button onClick={() => navigate('/singup')}>
            <li className="hover:text-primary">회원가입</li>
          </button>
        </ul>
        <div className="flex items-center lg:hidden">
          {login.user && (
            <div className="flex items-center gap-8">
              <img src={login.user?.user_metadata?.avatar_url} className="w-10 h-10" alt="" />
            </div>
          )}
          <button onClick={handleOnToggle} className={`ml-4`}>
            {open ? 'x' : <p>Menu</p>}
          </button>
        </div>
      </div>
      <div
        className={` fixed left-0 w-full bg-black/90 flex flex-col items-center justify-center transition-transform duration-300 ${
          open
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'
        } top-[9%] md:top-[6%] lg:hidden
`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg text-white  ">
          <button className='hover:text-primary' onClick={() => {
            setOpen(false);
            navigate('/')
          }}>
            홈
          </button>
          <button className='hover:text-primary' onClick={() => {
            setOpen(false);
            navigate('/movies')
          }}>
            영화
          </button>
          <button className='hover:text-primary' onClick={() => {
            setOpen(false);
            navigate('/login')
          }}>
            로그인
            setOpen(false);
        </button>
          <button className='hover:text-primary' onClick={() => {
            navigate('/singup')
          }}>
            로그인
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
