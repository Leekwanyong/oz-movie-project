import { useQueries } from '@tanstack/react-query';
import { getPopularMovies } from '../../api/getMovieApi.js';
import Slider from '../../components/common/SwiperSlider/Slider.jsx';
import Layout from '../../layout/Layout.jsx';

const CATEGORIES = ['now_playing', 'popular', 'top_rated', 'upcoming'];
const LENGTH = [0, 1, 2, 3];
function Home() {
  // Use Hook 뺼 생각을 해봐야 겠음
  const userQueries = useQueries({
    queries: CATEGORIES.map((item) => {
      return {
        queryKey: ['slider', item],
        queryFn: async () => {
          return await getPopularMovies(item);
        },
      };
    }),
  });

  const queriesData = userQueries.map((item) => item.data?.results?.map((v) => v));
  return (
    <Layout>
      <div>
        {CATEGORIES.map((category, index) => (
          <div key={category} className=" flex items-start flex-col justify-between">
            <p className="text-xl text-white font-semibold mt-4 ">{category}</p>
            <Slider items={queriesData[index]} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
