import { useNavigate } from 'react-router';
import { IMAGE_SIZE } from '../../../constant/imageSize.js';
import useImgOnError from '../../../hook/useImgOnError.js';

function SlideMovieCard({ item }) {
  const navigate = useNavigate();
  const handleImgError = useImgOnError();
  const handleOnNavigate = () => {
    navigate(`/movieDetailModal/${item.id}`);
  };

  return (
    <div
      onClick={handleOnNavigate}
      className={`relative w-full rounded-md mt-4 max-w-[350px] h-[10rem] group cursor-pointer transition-transform duration-300 overflow-hidden`}
    >
      <picture className="w-full h-full block">
        <source srcSet={`${IMAGE_SIZE.smail}${item?.backdrop_path}`} type="image/webp" />
        <img
          className="object-cover w-full h-full rounded-md"
          src={`${IMAGE_SIZE.smail}${item?.backdrop_path}`}
          alt={item?.title}
          width={350}
          height={160}
          loading="lazy"
          onError={handleImgError}
        />
      </picture>
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-md">
        <h3 className="text-white text-lg font-bold truncate">영화 제목: {item?.title}</h3>
        <p className="text-white text-sm">평점 | {item?.vote_average}</p>
      </div>
    </div>
  );
}

export default SlideMovieCard;
