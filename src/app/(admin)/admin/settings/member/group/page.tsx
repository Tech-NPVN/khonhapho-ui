import dynamic from 'next/dynamic';

const MemberGroupDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.GroupIndex),
  {
    ssr: false,
  },
);

const MemberGroupPage = () => {
  return <MemberGroupDynamic />;
};

export default MemberGroupPage;
