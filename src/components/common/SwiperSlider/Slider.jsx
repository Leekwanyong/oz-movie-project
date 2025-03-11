import React, { useMemo } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../index.css';
import 'swiper/css/pagination';
import SlideMovieCard from '../card/SlideMovieCard .jsx';

function Slider({ items = [] }) {
  const memoizer = useMemo(() => items || [], [items]);
  return (
    <div className="mx-auto w-full">
      {memoizer && (
        <Swiper
          modules={[A11y, Navigation, Pagination]}
          pagination={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={5}
          slidesPerGroup={5}
          speed={1000}
          loop={true}
        >
          {memoizer?.map((item) => (
            <SwiperSlide key={item?.id} className="group overflow-visible">
              <SlideMovieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default React.memo(Slider);
