import dynamic from 'next/dynamic';

const MemberBranchDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.BranchIndex),
  {
    ssr: false,
  },
);

const MemberBranchPage = () => {
  return <MemberBranchDynamic />;
};

export default MemberBranchPage;
