import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserAppointmentDynamic = dynamic(
  () => import('@/modules/client/user/appointment').then((res) => res.UserAppointmentIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const AppointmentPage = () => {
  return <UserAppointmentDynamic />;
};

export default AppointmentPage;
