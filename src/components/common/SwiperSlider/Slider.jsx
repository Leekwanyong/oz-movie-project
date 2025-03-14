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
      {memoizer.length > 0 && (
        <Swiper
          modules={[A11y, Navigation, Pagination]}
          pagination={true}
          navigation={true}
          spaceBetween={10}
          speed={1000}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 5, slidesPerGroup: 5 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            480: { slidesPerView: 2, slidesPerGroup: 2 },
            0: { slidesPerView: 1, slidesPerGroup: 1 },
          }}
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
