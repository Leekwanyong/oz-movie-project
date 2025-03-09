import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../../index.css';
import 'swiper/css/pagination';
import CardItem from '../card/CardItem.jsx';

function Slider({ items }) {
  return (
    <div className="mx-auto w-full">
      {items && (
        <Swiper
          modules={[A11y, Autoplay, Navigation, Pagination]}
          pagination={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={5}
          slidesPerGroup={5}
          speed={1000}
          loop={false}
          autoplay={{ delay: 300000000, disableOnInteraction: false }}
          className="overflow-visible"
        >
          {items?.map((item) => (
            <SwiperSlide key={item?.id} className="group overflow-visible">
              <CardItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Slider;
