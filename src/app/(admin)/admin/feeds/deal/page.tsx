import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsDealDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.DealsIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsDealPage = () => {
  return <FeedsDealDynamic />;
};

export default FeedsDealPage;
