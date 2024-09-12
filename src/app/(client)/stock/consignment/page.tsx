import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const ConsignmentDynamic = dynamic(
  () => import('@/modules/client/stocks/consignment').then((res) => res.StocksConsignmentIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ConsignmentPage = () => {
  return <ConsignmentDynamic />;
};

export default ConsignmentPage;
