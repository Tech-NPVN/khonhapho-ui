import dynamic from 'next/dynamic';

const RoleUpdateDynamic = dynamic(
  () =>
    import('@/modules/admin/permisson/components/permission-role/permission-role.form').then(
      (res) => res.PermissionRoleForm,
    ),
  {
    ssr: false,
  },
);

const RoleUpdatePage = ({ params }: Readonly<{ params: { id: string } }>) => {
  return <RoleUpdateDynamic id={params.id} />;
};

export default RoleUpdatePage;
