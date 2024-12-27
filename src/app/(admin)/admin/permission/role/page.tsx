import dynamic from 'next/dynamic';

const PermissionRoleDynamic = dynamic(
  () => import('@/modules/admin/permisson/components').then((res) => res.PermissionRoleIndex),
  {
    ssr: false,
  },
);

const PermissionRolePage = () => {
  return <PermissionRoleDynamic />;
};

export default PermissionRolePage;
