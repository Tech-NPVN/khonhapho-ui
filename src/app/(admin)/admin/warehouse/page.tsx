import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const AdminWarehouseDynamic = dynamic(
  () => import('@/modules/admin/warehouse').then((res) => res.AdminWarehouseIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AdminWarehousePage = () => {
  return <AdminWarehouseDynamic />;
};

export default AdminWarehousePage;
