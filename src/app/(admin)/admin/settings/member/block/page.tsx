import dynamic from 'next/dynamic';

const MemberBlockDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.BlockIndex),
  {
    ssr: false,
  },
);

const MemberBlockPage = () => {
  return <MemberBlockDynamic />;
};

export default MemberBlockPage;
