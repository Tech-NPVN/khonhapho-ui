import dynamic from 'next/dynamic';

const GroupCreateDynamic = dynamic(
  () =>
    import('@/modules/admin/permisson/components/permission-group/permission-group.form').then(
      (res) => res.PermissionGroupForm,
    ),
  {
    ssr: false,
  },
);

const GroupCreatePage = () => {
  return <GroupCreateDynamic />;
};

export default GroupCreatePage;
