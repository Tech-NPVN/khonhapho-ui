import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const WarehouseCreateDynamic = dynamic(
  () => import('@/modules/client/warehouse').then((res) => res.WarehouseCreateIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const WarehouseCreatePage = () => {
  return <WarehouseCreateDynamic />;
};

export default WarehouseCreatePage;
