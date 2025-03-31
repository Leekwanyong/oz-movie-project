import { lazy, Suspense } from 'react';
import SkeletonCard from '../../components/common/card/SkeletonCard.jsx';
import useGetQueriesData from '../../hook/useGetQueriesData.js';
import useResponsiveSkeletonCount from '../../hook/useResponsiveSkeletonCount.js';
import HeroSection from './HeroSection.jsx';

const Slider = lazy(() => import('../../components/common/SwiperSlider/Slider.jsx'));

function Home() {
  const { data, queriesData, isLoading } = useGetQueriesData();
  const skeletonCount  = useResponsiveSkeletonCount('home');
  const suspense =   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {Array.from({ length: skeletonCount }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>



  return (
    <main>
      <HeroSection />
      {data.map((category, index) => (
        <div key={category} className=" flex items-start flex-col justify-between mt-16">
          <p className="text-xl text-white font-semibold mt-8 ">{category}</p>
          <Suspense fallback={suspense}>
          <Slider items={queriesData[index]} isLoading={isLoading[index]} />
          </Suspense>
        </div>
      ))}
    </main>
  );
}

export default Home;
