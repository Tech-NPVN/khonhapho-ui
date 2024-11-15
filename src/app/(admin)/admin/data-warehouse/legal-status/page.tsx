import dynamic from 'next/dynamic';

const LegalStatusDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.LegalStatusIndex),
  {
    ssr: false,
  },
);

const LegalStatusPage = () => {
  return <LegalStatusDynamic />;
};

export default LegalStatusPage;
