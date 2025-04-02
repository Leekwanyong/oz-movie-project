import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Information from '../../components/common/Icon/Information.jsx';
import Play from '../../components/common/Icon/Play.jsx';
import { YOUTUBE_URL } from '../../constant/youtubeUrl.js';
import { useGetMovieQuery } from '../../hook/useGetMovieQuery.js';
import useVideoFilter from '../../hook/useVideoFilter.js';

const youtubeImg = `https://img.youtube.com/vi/`
const MOVIE_ID = ['950396', '1064213', '822119', '823219'];
function HeroSection() {
  const random = MOVIE_ID[Math.floor(Math.random() * MOVIE_ID.length)];
  const [randomId] = useState(random);
  const data = useGetMovieQuery(randomId);
  const video = useVideoFilter(data);
  const [player, setPlayer] = useState(true);
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/movieDetailModal/${randomId}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayer(false);
    },2500)

    return () => clearTimeout(timer);
  }, [])

  return (
    <section
      className="relative w-full h-[30rem] sm:h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden"
    >
      {
        video?.map((item) => (
          <div className="absolute inset-0 w-full h-full z-0" key={item?.id}>
            <img
              src={`${youtubeImg}${video[0]?.key}/hqdefault.jpg`}
              decoding='async'
              fetchpriority='high'
              alt={`공식 예고편 썸네일`}
              className={`${player ? `opacity-100 absolute inset-0 w-full h-full object-cover z-0` : `opacity-0`}`}
            />
            <iframe
              src={`${YOUTUBE_URL}${item?.key}`}
              title="예고편 영상"
              allowFullScreen
              className={`${player === false ? `opacity-100 absolute inset-0 w-full h-full object-cover z-0` : `opacity-0`}`}
            />
          </div>
        ))
      }
      <div className="absolute top-[70%] left-[2%] z-30 flex items-center gap-8 font-semibold">
        <button
          className="bg-white text-black rounded-md flex items-center gap-2 px-7 py-4 md:px-6 text-sm lg:px-12 hover:scale-105 hover:shadow-xl transition-all duration-300"
          onClick={handlePlay}
          aria-label="재생"
        >
          <Play aria-hidden="true" />
          재생
        </button>
        <button
          className="bg-white/20 text-white border border-white rounded-md flex items-center gap-2 px-7 py-4 md:px-6 text-sm lg:px-12 hover:scale-105 hover:shadow-xl transition-all duration-300"
          onClick={handlePlay}
          aria-label="상세 정보"
        >
          <Information aria-hidden="true" />
          상세 정보
        </button>
      </div>
    </section>
  );
}
  export default HeroSection;
