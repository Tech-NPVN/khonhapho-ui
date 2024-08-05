import Loading from '@/app/loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Danh sách kho hàng',
};

const WarehouseDynamic = dynamic(
  () => import('@/modules/client/warehouse').then((res) => res.WarehouseIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const WarehousePage = () => {
  return <WarehouseDynamic />;
};

export default WarehousePage;
