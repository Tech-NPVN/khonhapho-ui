import dynamic from 'next/dynamic';

const SaleStatusDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.SaleStatusIndex),
  {
    ssr: false,
  },
);

const SaleStatusPage = () => {
  return <SaleStatusDynamic />;
};

export default SaleStatusPage;
