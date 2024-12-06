import dynamic from 'next/dynamic';

const MemberAreaDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.AreaIndex),
  {
    ssr: false,
  },
);

const MemberAreaPage = () => {
  return <MemberAreaDynamic />;
};

export default MemberAreaPage;
