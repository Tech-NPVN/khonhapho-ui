import dynamic from 'next/dynamic';

const MemberProvinceDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.ProvinceIndex),
  {
    ssr: false,
  },
);

const MemberProvincePage = () => {
  return <MemberProvinceDynamic />;
};

export default MemberProvincePage;
