import React from 'react';
import { useNavigate } from 'react-router';

function InfiniteScrollMovieCard({ item }) {
  const navigate = useNavigate();

  const handleOnNavigate = () => {
    navigate(`/movieDetailModal/${item.id}`);
  };
  return (
    <section>
      <div
        className="flex flex-col gap-2 cursor-pointer h-[25rem] p-4 rounded-lg hover:scale-105  transition-transform hover:shadow-2xl"
        onClick={handleOnNavigate}
      >
        <img
          className="  object-cover w-full h-full rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
          alt={item?.title}
        />
        <p className="text-lg font-semibold drop-shadow-md">{item?.title}</p>
        <p className=" text-grayDark text-sm drop-shadow-md">평점: ⭐ {item?.vote_average}</p>
      </div>
    </section>
  );
}

export default InfiniteScrollMovieCard;
