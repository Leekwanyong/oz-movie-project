import { useNavigate } from 'react-router';
import { IMAGE_SIZE } from '../../../constant/imageSize.js';
import useImgOnError from '../../../hook/useImgOnError.js';
import useLazyImage from '../../../hook/useLazyImage.js';

function InfiniteScrollMovieCard({ item }) {
  const imageRef = useLazyImage();
  const navigate = useNavigate();
  const handleImgError = useImgOnError();

  const handleOnNavigate = () => {
    navigate(`/movieDetailModal/${item.id}`);
  };
  return (
    <section>
      <div
        className="flex flex-col gap-2 cursor-pointer h-[25rem] p-4 rounded-lg hover:scale-105  transition-transform hover:shadow-2xl"
        onClick={handleOnNavigate}
      >
        <picture>
          <source srcSet={`${IMAGE_SIZE.smail}${item?.backdrop_path}`} type='image/webp' width={445} height={400}/>
        <img
          className="object-cover w-full h-full rounded-lg"
          data-src={`${IMAGE_SIZE.smail}${item?.backdrop_path}`}
          alt={item?.title}
          width={445}
          height={400}
          ref={imageRef}
          onError={handleImgError}
        />
        </picture>
        <p className="text-lg font-semibold drop-shadow-md">{item?.title}</p>
        <p className=" text-grayDark text-sm drop-shadow-md">평점: ⭐ {item?.vote_average}</p>
      </div>
    </section>
  );
}

export default InfiniteScrollMovieCard;
