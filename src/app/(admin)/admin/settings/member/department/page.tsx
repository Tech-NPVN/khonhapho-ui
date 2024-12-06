import dynamic from 'next/dynamic';

const MemberDepartmentDynamic = dynamic(
  () => import('@/modules/admin/settings/settings-member').then((res) => res.DepartmentIndex),
  {
    ssr: false,
  },
);

const MemberDepartmentPage = () => {
  return <MemberDepartmentDynamic />;
};

export default MemberDepartmentPage;
