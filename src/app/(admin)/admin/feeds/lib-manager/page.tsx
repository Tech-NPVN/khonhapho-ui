import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsLibManagerDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.LibManagerIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminFeedsManagerPage = () => {
  return <FeedsLibManagerDynamic />;
};

export default AdminFeedsManagerPage;
