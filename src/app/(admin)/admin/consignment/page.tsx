import dynamic from 'next/dynamic';

const ConsignmentPageDynamic = dynamic(
  () => import('@/modules/admin/consignment').then((res) => res.ConsignmentIndex),
  {
    ssr: false,
  },
);

const ConsignmentPage = () => {
  return <ConsignmentPageDynamic />;
};

export default ConsignmentPage;
