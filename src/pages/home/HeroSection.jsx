import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { getMovieVideo } from '../../api/getMovieApi.js';
import Information from '../../components/common/Icon/Information.jsx';
import Play from '../../components/common/Icon/Play.jsx';

const MOVIE_ID = ['950396', '1064213', '822119', '823219'];
function HeroSection() {
  const random = MOVIE_ID[Math.floor(Math.random() * MOVIE_ID.length)];
  const { data } = useQuery({
    queryKey: ['video'],
    queryFn: () => getMovieVideo(random),
  });
  const [player, setPlayer] = useState(false);
  const teaserVideo = [data?.results?.filter((v) => v.type === 'Trailer')[0]];

  return (
    <section className="w-full h-[50rem] relative" onMouseMove={() => setPlayer(true)}>
      {teaserVideo?.map((item) => (
        <ReactPlayer
          url={`https://www.youtube.com/embed/${item?.key}`}
          width="100%"
          height="100%"
          volume={0.3}
          playing={player}
        />
      ))}
      {teaserVideo?.map((item) => (
        <div className="absolute top-[70%] left-[2%]" key={item?.id}>
          <div className="flex items-center justify-between gap-8 font-semibold">
            <button className="bg-white text-black px-10 py-4 rounded-md flex items-center gap-2">
              <Play />
              재생
            </button>
            <button className="bg-transparent text-white px-10 py-4 rounded-md flex items-center gap-2">
              <Information />
              상세 정보
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default HeroSection;
