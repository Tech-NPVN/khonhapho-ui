import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsLibAssistDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.LibAssistIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminFeedsAssistPage = () => {
  return <FeedsLibAssistDynamic />;
};

export default AdminFeedsAssistPage;
