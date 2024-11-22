import dynamic from 'next/dynamic';

const DistrictsDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.DistrictsIndex),
  {
    ssr: false,
  },
);

const DistrictsPage = () => {
  return <DistrictsDynamic />;
};

export default DistrictsPage;
