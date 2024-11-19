import dynamic from 'next/dynamic';

const PriceRangeDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.PriceRangeIndex),
  {
    ssr: false,
  },
);

const PriceRangePage = () => {
  return <PriceRangeDynamic />;
};

export default PriceRangePage;
