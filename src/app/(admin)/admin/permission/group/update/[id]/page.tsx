import dynamic from 'next/dynamic';

const GroupUpdateDynamic = dynamic(
  () =>
    import('@/modules/admin/permisson/components/permission-group/permission-group.form').then(
      (res) => res.PermissionGroupForm,
    ),
  {
    ssr: false,
  },
);

const GroupUpdatePage = ({ params }: Readonly<{ params: { id: string } }>) => {
  return <GroupUpdateDynamic id={params.id} />;
};

export default GroupUpdatePage;
