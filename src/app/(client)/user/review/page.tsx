import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserReviewDynamic = dynamic(
  () => import('@/modules/client/user/review').then((res) => res.UserReviewIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ReviewPage = () => {
  return <UserReviewDynamic />;
};

export default ReviewPage;
