import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { menuWarehouseData } from '@/modules/admin/data-warehouse';

const DataWarehouseLayoutDynamic = dynamic(
  () => import('@/components/reuse/navigation').then((res) => res.SidebarLayout),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const DataWarehouseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataWarehouseLayoutDynamic menu={menuWarehouseData}>{children}</DataWarehouseLayoutDynamic>
  );
};

export default DataWarehouseLayout;
