import dynamic from 'next/dynamic';

const PropertyTypeDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.PropertyTypeIndex),
  {
    ssr: false,
  },
);

const PropertyTypePage = () => {
  return <PropertyTypeDynamic />;
};

export default PropertyTypePage;
