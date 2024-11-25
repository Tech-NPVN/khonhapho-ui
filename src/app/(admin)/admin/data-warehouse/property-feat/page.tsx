import dynamic from 'next/dynamic';

const PropertyFeatDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.PropertyFeatIndex),
  {
    ssr: false,
  },
);

const PropertyFeatPage = () => {
  return <PropertyFeatDynamic />;
};

export default PropertyFeatPage;
