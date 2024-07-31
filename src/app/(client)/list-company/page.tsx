import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const ListCompanyDynamic = dynamic(
  () => import('@/modules/client/company').then((res) => res.CompanyIndex),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const ListCompanyPage = () => {
  return <ListCompanyDynamic />;
};

export default ListCompanyPage;
