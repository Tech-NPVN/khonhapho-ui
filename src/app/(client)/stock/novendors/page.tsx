import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const NovendorsDynamic = dynamic(
  () => import('@/modules/client/stocks/novendors').then((res) => res.StocksNovendorsIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);


const NovendorsPage = () => {
  return <NovendorsDynamic />;
};

export default NovendorsPage;
