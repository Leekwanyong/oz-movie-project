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
  const filteredVideos = useVideoFilter(modalVideo);
  const { data } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => getMovieDetail(params?.id),
  });

  const closeModal = () => {
    navigate(-1);
  };

  const genresMemo = useMemo(() => data?.genres ?? [], [data?.genres ?? []]);
  const hasVideo = Array.isArray(filteredVideos) && filteredVideos.length > 0;
  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full mx-auto  bg-black/20 backdrop-blur-lg flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#181818] rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-[1000px] max-h-[1000px] overflow-hidden sm:w-[95vw] sm:h-[80vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video">
          {hasVideo ? (
            filteredVideos?.map((video) => (
              <ReactPlayer
                key={video?.id}
                width="100%"
                height="100%"
                url={`https://www.youtube.com/embed/${video?.key}`}
                playing={true}
                volume={0.3}
              />
            ))
          ) : (
            <img
              className="  object-cover w-full h-full rounded-lg"
              src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
              alt={data?.title}
            />
          )}
        </div>

        <div className="p-6 flex flex-col gap-4 sm:gap-2 text-white">
          <h2 className="text-2xl font-bold sm:text-xl">{data?.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <p>출시 날짜: {data?.release_date}</p>
            <p>평점: ⭐ {data?.vote_average}</p>
          </div>
          <div className="flex items-center gap-4 sm:gap-2 text-sm text-gray-400">
            <span>장르:</span>
            {genresMemo.map((genre) => (
              <span key={genre?.id} className="py-1 bg-gray-700 rounded-md sm:px-2 sm:py-0.5">
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
