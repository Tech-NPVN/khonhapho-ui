import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const ReviewDynamic = dynamic(
  () => import('@/modules/client/stocks/review').then((res) => res.StocksReviewIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ReviewPage = () => {
  return <ReviewDynamic />;
};

export default ReviewPage;
