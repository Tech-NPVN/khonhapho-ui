import dynamic from 'next/dynamic';

const PermissionPermitDynamic = dynamic(
  () => import('@/modules/admin/permisson/components').then((res) => res.PermissionPermitIndex),
  {
    ssr: false,
  },
);

const PermissionPermitPage = () => {
  return <PermissionPermitDynamic />;
};

export default PermissionPermitPage;
