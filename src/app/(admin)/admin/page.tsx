import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const AdminHomePageDynamic = dynamic(
  () => import('@/modules/admin/home/components').then((res) => res.AdminHomeIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminPage = () => {
  return <AdminHomePageDynamic />;
};

export default AdminPage;
