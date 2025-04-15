import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Information from '../../components/common/Icon/Information.jsx';
import Play from '../../components/common/Icon/Play.jsx';
import { YOUTUBE_URL } from '../../constant/youtubeUrl.js';
import { useGetMovieQuery } from '../../hook/useGetMovieQuery.js';
import useVideoFilter from '../../hook/useVideoFilter.js';
// import useLazyImage from '../../hook/useLazyImage.js';

const youtubeImg = `https://img.youtube.com/vi/`;
const MOVIE_ID = ['950396', '1064213', '822119', '823219'];
function HeroSection() {
  const random = MOVIE_ID[Math.floor(Math.random() * MOVIE_ID.length)];
  const [randomId] = useState(random);
  const data = useGetMovieQuery(randomId);
  const video = useVideoFilter(data);
  const [player, setPlayer] = useState(false);
  const navigate = useNavigate();
  const imgRef = useRef(null);

  // 이미지 로드 효과
  useEffect(() => {
    if (!imgRef.current || !video || !video.length) return;

    const img = imgRef.current;
    if (img && img.dataset && img.dataset.src) {
      const newImage = new Image();
      newImage.src = img.dataset.src;
      newImage.onload = () => {
        img.src = img.dataset.src;
      };
    }
  }, [video]);

  const handlePlay = () => {
    navigate(`/movieDetailModal/${randomId}`);
  };

  const handleIframeChange = () => {
    setPlayer(true);
  };

  const renderHero = () => {
    if (!video || !video.length) return null;

    if (player === false) {
      return (
        <div className="absolute top-0 inset-0 z-0 w-full h-full flex items-center justify-center bg-black/40">
          <picture className="w-full h-full max-w-[1600px] mx-auto overflow-hidden">
            <source
              media={'(max-width: 639px)'}
              srcSet={`${youtubeImg}${video[0]?.key}/mqdefault.jpg`}
            />
            <source
              media={'(min-width: 640px) and (max-width: 1023px)'}
              srcSet={`${youtubeImg}${video[0]?.key}/sddefault.jpg`}
            />
            <source
              media={'(min-width: 1024px)'}
              srcSet={`${youtubeImg}${video[0]?.key}/maxresdefault.jpg`}
            />
            <img
              src="/asset/defaulImg.jpg"
              data-src={`${youtubeImg}${video[0]?.key}/hqdefault.jpg`}
              ref={imgRef}
              decoding="auto"
              fetchPriority="high"
              loading="eager"
              alt="공식 예고편 썸네일"
              className="w-full h-full object-contain"
            />
          </picture>
        </div>
      );
    } else {
      return (
        <div className="absolute top-0 inset-0 z-0 w-full h-full flex items-center justify-center bg-black">
          <div className="w-full h-full max-w-[1600px] mx-auto">
            <iframe
              src={`${YOUTUBE_URL}${video[0]?.key}`}
              title="예고편 영상"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <section className="relative w-full mt-28 h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {renderHero()}
      <div className="max-w-[1600px] mx-auto relative h-full" onClick={handleIframeChange}>
        <div className="absolute bottom-[15%] sm:bottom-[12%] md:bottom-[10%] lg:bottom-[15%] left-[5%] sm:left-[8%] md:left-[10%] lg:left-[8%] xl:left-[5%] z-[5]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={handlePlay}
              className="bg-white text-black rounded-md flex items-center gap-1 sm:gap-2 px-3 py-2 text-xs sm:text-sm md:text-base md:px-5 md:py-3 lg:px-8 lg:py-4 font-medium hover:bg-opacity-90 transition-all duration-300"
              aria-label="재생"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
              <span>재생</span>
            </button>
            <button
              className="bg-black/50 text-white border border-white rounded-md flex items-center gap-1 sm:gap-2 px-3 py-2 text-xs sm:text-sm md:text-base md:px-5 md:py-3 lg:px-8 lg:py-4 font-medium hover:bg-black/70 transition-all duration-300"
              onClick={handlePlay}
              aria-label="상세 정보"
            >
              <Information className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
              <span>상세 정보</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
