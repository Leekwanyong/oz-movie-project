import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router';
import { getMovieDetail } from '../../../api/getMovieApi.js';
import { useModalVideoQuery } from '../../../hook/useGetMovieQuery.js';
import useVideoFilter from '../../../hook/useVideoFilter.js';

function Modal() {
  const params = useParams();
  const navigate = useNavigate();
  const modalVideo = useModalVideoQuery(params?.id);
  const video = useVideoFilter(modalVideo);
  const { data } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => getMovieDetail(params?.id),
  });

  const handleToggle = () => {
    navigate(-1);
  };

  const genresMemo = useMemo(() => data?.genres ?? [], [data]);

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full  bg-black/20 backdrop-blur-lg flex items-center justify-center z-50"
      onClick={handleToggle}
    >
      <div className="bg-[#181818] rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-[1000px] max-h-[1000px] overflow-hidden">
        <div className="w-full aspect-video">
          {video.map((video) => (
            <ReactPlayer
              width="100%"
              height="100%"
              url={`https://www.youtube.com/embed/${video?.key}`}
              playing={true}
              volume={0.3}
            />
          ))}
        </div>

        <div className="p-6 flex flex-col gap-4 text-white">
          <h2 className="text-2xl font-bold">{data?.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <p>출시 날짜: {data?.release_date}</p>
            <p>평점: ⭐ {data?.vote_average}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span>장르:</span>
            {genresMemo.map((genre) => (
              <span key={genre?.id} className=" py-1 bg-gray-700 rounded-md">
                {genre?.name}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-gray-200">{data?.overview}</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default React.memo(Modal);
