import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsUrgentlyDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.UrgentlyIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsUrgentlyPage = () => {
  return <FeedsUrgentlyDynamic />;
};

export default FeedsUrgentlyPage;
