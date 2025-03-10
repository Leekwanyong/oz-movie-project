import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../index.css';
import 'swiper/css/pagination';
import SlideMovieCard from '../card/SlideMovieCard .jsx';

function Slider({ items }) {
  return (
    <div className="mx-auto w-full">
      {items && (
        <Swiper
          modules={[A11y, Navigation, Pagination]}
          pagination={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={5}
          slidesPerGroup={5}
          speed={1000}
          loop={true}
          className="overflow-visible"
        >
          {items?.map((item) => (
            <SwiperSlide key={item?.id} className="group overflow-visible">
              <SlideMovieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Slider;
