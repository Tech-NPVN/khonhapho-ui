import dynamic from 'next/dynamic';

const StreetsDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.StreetsIndex),
  {
    ssr: false,
  },
);

const StreetsPage = () => {
  return <StreetsDynamic />;
};

export default StreetsPage;
