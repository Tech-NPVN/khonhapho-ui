import dynamic from 'next/dynamic';

const CitiesDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.CitiesIndex),
  {
    ssr: false,
  },
);

const CitiesPage = () => {
  return <CitiesDynamic />;
};

export default CitiesPage;
