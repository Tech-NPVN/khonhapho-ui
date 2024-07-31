import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsCategoriesDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.CategoriesIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsCategoriesPage = () => {
  return <FeedsCategoriesDynamic />;
};

export default FeedsCategoriesPage;
