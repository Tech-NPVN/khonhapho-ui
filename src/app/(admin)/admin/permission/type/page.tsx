import dynamic from 'next/dynamic';

const PermissionTypeDynamic = dynamic(
  () => import('@/modules/admin/permisson/components').then((res) => res.PermissionTypeIndex),
  {
    ssr: false,
  },
);

const PermissionTypePage = () => {
  return <PermissionTypeDynamic />;
};

export default PermissionTypePage;
