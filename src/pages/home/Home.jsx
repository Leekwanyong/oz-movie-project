import Slider from '../../components/common/SwiperSlider/Slider.jsx';
import useGetQueriesData from '../../hook/useGetQueriesData.js';
import HeroSection from './HeroSection.jsx';

function Home() {
  const { CATEGORIES, queriesData } = useGetQueriesData();

  return (
    <main>
      <HeroSection />
      {CATEGORIES.map((category, index) => (
        <div key={category} className=" flex items-start flex-col justify-between mt-16">
          <p className="text-xl text-white font-semibold mt-8 ">{category}</p>
          <Slider items={queriesData[index]} />
        </div>
      ))}
    </main>
  );
}

export default Home;
