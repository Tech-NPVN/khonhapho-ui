import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsLibKnowledgeDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.LibKnowledgeIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminFeedsKnowledgePage = () => {
  return <FeedsLibKnowledgeDynamic />;
};

export default AdminFeedsKnowledgePage;
