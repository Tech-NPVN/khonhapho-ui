import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const AppointmentDynamic = dynamic(
  () => import('@/modules/client/stocks/appointment').then((res) => res.StocksAppointmentIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AppointmentPage = () => {
  return <AppointmentDynamic />;
};

export default AppointmentPage;
