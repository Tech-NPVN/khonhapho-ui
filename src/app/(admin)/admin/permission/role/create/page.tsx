import dynamic from 'next/dynamic';

const RoleCreateDynamic = dynamic(
  () =>
    import('@/modules/admin/permisson/components/permission-role/permission-role.form').then(
      (res) => res.PermissionRoleForm,
    ),
  {
    ssr: false,
  },
);

const RoleCreatePage = () => {
  return <RoleCreateDynamic />;
};

export default RoleCreatePage;
