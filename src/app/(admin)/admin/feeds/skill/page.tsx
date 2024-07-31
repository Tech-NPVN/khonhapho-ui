import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const FeedsSkillDynamic = dynamic(
  () => import('@/modules/admin/feeds/components').then((res) => res.SkillIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsSkillPage = () => {
  return <FeedsSkillDynamic />;
};

export default FeedsSkillPage;
