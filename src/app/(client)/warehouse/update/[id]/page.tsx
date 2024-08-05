import Loading from '@/app/loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Sửa tin kho hàng',
};

const WarehouseUpdateDynamic = dynamic(
  () => import('@/common/form').then((res) => res.WarehouseForm),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const WarehouseUpdatePage = ({ params }: Readonly<{ params: { id: string } }>) => {
  return <WarehouseUpdateDynamic id={params.id} />;
};

export default WarehouseUpdatePage;
