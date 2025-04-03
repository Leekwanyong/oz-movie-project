import React, { useMemo } from 'react';
import { A11y, Navigation, Pagination, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../index.css';
import 'swiper/css/pagination';
import useResponsiveSkeletonCount from '../../../hook/useResponsiveSkeletonCount.js';
import SkeletonCard from '../card/SkeletonCard.jsx';
import SlideMovieCard from '../card/SlideMovieCard .jsx';

function Slider({ items = [], isLoading }) {
  const memoizer = useMemo(() => items || [], [items]);
  const skeletonCount  = useResponsiveSkeletonCount('home');

  const movies = isLoading ? Array.from({length:skeletonCount}).map((_,i) => <SwiperSlide key={i}><SkeletonCard /> </SwiperSlide>) :
    memoizer?.map((item) => <SwiperSlide key={item?.id} className="group overflow-visible">
      <SlideMovieCard item={item} isLoading={isLoading}/>
    </SwiperSlide>)
  return (
    <article className="mx-auto w-full">
      {memoizer.length > 0 && (
        <Swiper
          modules={[A11y, Navigation, Pagination, Virtual]}
          pagination={true}
          navigation={true}
          spaceBetween={10}
          virtual={true}
          speed={1000}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            480: { slidesPerView: 2, slidesPerGroup: 2 },
            0: { slidesPerView: 1, slidesPerGroup: 1 },
          }}
        >
          {movies}
        </Swiper>
      )}
    </article>
  );
}

export default React.memo(Slider);
