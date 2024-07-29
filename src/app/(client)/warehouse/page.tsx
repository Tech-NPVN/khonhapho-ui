import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

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
