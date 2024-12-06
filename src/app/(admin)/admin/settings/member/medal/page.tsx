import dynamic from 'next/dynamic';

const MemberMedalDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.MedalIndex),
  {
    ssr: false,
  },
);

const MemberMedalPage = () => {
  return <MemberMedalDynamic />;
};

export default MemberMedalPage;
