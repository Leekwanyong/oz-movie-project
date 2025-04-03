import React, {  useState } from 'react';
import {  useNavigate } from 'react-router';
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
  const [player, setPlayer] = useState(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/movieDetailModal/${randomId}`);
  };

  const handleIframeChange = () => {
    setPlayer(true);
  }

  const videoFacadeJSX = video?.map((item) => {
      if (player === false) {
        return (<picture className="absolute top-0 inset-0 z-0" key={item?.id} onClick={handleIframeChange}>
          <source media={'(max-width: 639px)'} srcSet={`${youtubeImg}${video[0]?.key}/mqdefault.jpg`} width='480' height='180'/>
          <source media={'(min-width: 640px) and (max-width: 1023px)'} srcSet={`${youtubeImg}${video[0]?.key}/sddefault.jpg`} width='768' height='768'/>
          <source media={'(max-width: 1024px)'} srcSet={`${youtubeImg}${video[0]?.key}/maxresdefault.jpg`} width='1280' height='780'/>
          <img
            src={`${youtubeImg}${video[0]?.key}/hqdefault.jpg`}
            decoding='auto'
            fetchPriority='high'
            loading='eager'
            alt={`공식 예고편 썸네일`}
            width='1880'
            height='800'
            className={`block absolute inset-0 aspect-video w-full h-auto object-cover z-0`}
          />
        </picture>)
      } else {
        return (<picture className="absolute top-0 inset-0 z-0" key={item?.id}>
          <iframe
            src={`${YOUTUBE_URL}${item?.key}`}
            title="예고편 영상"
            allowFullScreen
            width='1880'
            height='800'
            className={`block absolute inset-0 aspect-video w-full h-auto object-cover z-0`}
          />
        </picture>)
      }
    })



  return (
    <section
      className="relative w-full aspect-video  mt-20 h-[30rem] sm:h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden"
    >
      {videoFacadeJSX}
      <div className="absolute top-[28%] sm:top-[65%] lg:top-[65%] left-[2%] z-[5] flex items-center gap-8 font-semibold">
        <button
          onClick={handlePlay}
          className="bg-white text-black rounded-md flex items-center gap-2 px-2 py-2 text-xs  md:px-6  lg:px-12 lg:py-5  hover:scale-105 hover:shadow-xl transition-all duration-300"
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
