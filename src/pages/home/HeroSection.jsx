import { useState } from 'react';
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
  const [player, setPlayer] = useState(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/movieDetailModal/${randomId}`);
  };

  return (
    <section className="w-full h-[50rem] mt-20  relative " onMouseMove={() => setPlayer(true)}>
      {player ? video?.map((item) => (
        <div className='w-full h-full' key={item?.id}>
        <iframe src={`${YOUTUBE_URL}${item?.key}`} className='w-full h-full object-cover'/>
        </div>
      )) :
          <img src={`${youtubeImg}${video[0]?.key}/maxresdefault.jpg`} alt={video[0]?.type}  className='object-cover w-full h-full'/>
      }
      <div className="absolute top-[70%] left-[2%]">
        <div className="flex items-center justify-between gap-8 font-semibold">
          <button
            className="bg-white text-black rounded-md flex items-center gap-2 px-7 py-4  md:px-6  text-[12px] lg:px-12"
            onClick={handlePlay}
          >
            <Play />
            재생
          </button>
          <button
            className="bg-transparent text-black rounded-md flex items-center gap-2 px-7 py-4 md:px-6  text-[12px] lg:px-12"
            onClick={handlePlay}
          >
            <Information />
            상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
