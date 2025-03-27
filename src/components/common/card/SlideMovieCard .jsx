import { useNavigate } from 'react-router';

function SlideMovieCard({ item }) {
  const navigate = useNavigate();

  const handleOnNavigate = () => {
    navigate(`/movieDetailModal/${item.id}`);
  };

  return (
    <div>
      <div
        className={`relative w-full mt-4 max-w-[350px] h-[10rem] cursor-pointer transition-transform duration-300 `}
        onClick={handleOnNavigate}
      >
        <img
          className="object-cover w-full h-full rounded-md mr-4"
          src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
          alt={item?.title}
        />

        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-bold">영화 제목: {item?.title}</h3>
          <p className="text-white text-sm">평점 | {item?.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default SlideMovieCard;
