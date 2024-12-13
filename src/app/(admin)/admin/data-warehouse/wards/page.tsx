import dynamic from 'next/dynamic';

const WardsDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.WardsIndex),
  {
    ssr: false,
  },
);

const WardsPage = () => {
  return <WardsDynamic />;
};

export default WardsPage;
