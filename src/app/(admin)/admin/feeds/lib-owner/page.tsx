import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsLibOwnerDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.LibOwnerIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminFeedsOwnerPage = () => {
  return <FeedsLibOwnerDynamic />;
};

export default AdminFeedsOwnerPage;
