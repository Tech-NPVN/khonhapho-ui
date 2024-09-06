import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const OwnDynamic = dynamic(
  () => import('@/modules/client/stocks/own').then((res) => res.StocksOwnIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const OwnPage = () => {
  return <OwnDynamic />;
};

export default OwnPage;
