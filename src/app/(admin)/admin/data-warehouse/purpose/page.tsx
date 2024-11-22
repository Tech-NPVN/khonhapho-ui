import dynamic from 'next/dynamic';

const PurposeDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.PurposeIndex),
  {
    ssr: false,
  },
);

const PurposePage = () => {
  return <PurposeDynamic />;
};

export default PurposePage;
