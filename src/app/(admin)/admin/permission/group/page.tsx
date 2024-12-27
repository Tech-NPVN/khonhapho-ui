import dynamic from 'next/dynamic';

const PermissionGroupDynamic = dynamic(
  () => import('@/modules/admin/permisson/components').then((res) => res.PermissionGroupIndex),
  {
    ssr: false,
  },
);

const PermissionGroupPage = () => {
  return <PermissionGroupDynamic />;
};

export default PermissionGroupPage;
