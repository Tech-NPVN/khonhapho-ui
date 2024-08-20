import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const UserCustomerDynamic = dynamic(
  () => import('@/modules/client/user/customers').then((res) => res.UserCustomersIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const CustomersPage = () => {
  return <UserCustomerDynamic />;
};

export default CustomersPage;
