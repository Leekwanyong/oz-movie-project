import React from 'react';

function InfiniteScrollMovieCard({ item }) {
  console.log(item, 'item');
  return (
    <section>
      <div className="flex flex-col gap-2 cursor-pointer  h-[20rem]   border p-4 rounded-lg hover:scale-105 transition-transform hover:shadow-lg">
        <img
          className="  object-cover w-full h-full rounded-lg"
          src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
          alt="포스터"
        />
        <p className="text-lg font-semibold">{item?.title}</p>
        <p className=" text-grayDark text-sm">평점: ⭐ {item?.vote_average}</p>
      </div>
    </section>
  );
}

export default InfiniteScrollMovieCard;
