import dynamic from 'next/dynamic';

const AreaRangeDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.AreaRangeIndex),
  {
    ssr: false,
  },
);

const AreaRangePage = () => {
  return <AreaRangeDynamic />;
};

export default AreaRangePage;
