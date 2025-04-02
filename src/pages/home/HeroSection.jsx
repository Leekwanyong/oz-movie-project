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

//   default.jpg	120 x 90 px	가장 작음 (초소형 썸네일)
//   mqdefault.jpg	320 x 180 px	중간 품질 (medium quality)
//   hqdefault.jpg	480 x 360 px	고화질 (high quality)
//   sddefault.jpg	640 x 480 px	SD (Standard Definition) 품질
//   maxresdefault.jpg	1280 x 720 px	HD (최고 화질) – 영상에 따라 없을 수도 있음

  return (
    <section
      className="relative w-full aspect-video  mt-20 h-[30rem] sm:h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden"
    >
      {
        video?.map((item) => (
          <picture className="absolute top-0 inset-0 z-0" key={item?.id}>
            <source media={'(max-width: 639px)'} srcSet={`${youtubeImg}${video[0]?.key}/mqdefault.jpg`} width='480' height='180'/>
            <source media={'(min-width: 640px) and (max-width: 1023px)'} srcSet={`${youtubeImg}${video[0]?.key}/sddefault.jpg`} width='768' height='768'/>
            <source media={'(max-width: 1024px)'} srcSet={`${youtubeImg}${video[0]?.key}/maxresdefault.jpg`} width='1280' height='780'/>
            <img
              src={`${youtubeImg}${video[0]?.key}/hqdefault.jpg`}
              decoding='async'
              fetchpriority='high'
              alt={`공식 예고편 썸네일`}
              width='1880'
              height='800'
              className={`${player ? `opacity-100 absolute inset-0 aspect-video w-full h-auto object-cover z-0` : `opacity-0`}`}
            />
            <iframe
              src={`${YOUTUBE_URL}${item?.key}`}
              title="예고편 영상"
              allowFullScreen
              width='1880'
              height='800'
              className={`${player === false ? `opacity-100 absolute inset-0 aspect-video w-full h-auto object-cover z-0` : `opacity-0`}`}
            />
          </picture>
        ))
      }
      <div className="absolute top-[28%] sm:top-[65%] lg:top-[65%] left-[2%] z-[5] flex items-center gap-8 font-semibold">
        <button
          className="bg-white text-black rounded-md flex items-center gap-2 px-2 py-2 text-xs  md:px-6  lg:px-12 lg:py-5  hover:scale-105 hover:shadow-xl transition-all duration-300"
          onClick={handlePlay}
          aria-label="재생"
        >
          <Play aria-hidden="true" />
          재생
        </button>
        <button
          className="bg-white/20 text-white border border-white rounded-md flex items-center gap-2 px-2 text-xs py-2 md:px-6 lg:px-12 lg:py-5  hover:scale-105 hover:shadow-xl transition-all duration-300"
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
