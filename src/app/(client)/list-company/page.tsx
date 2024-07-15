import dynamic from 'next/dynamic';

const ListCompanyDynamic = dynamic(
  () => import('@/modules/client/company').then((res) => res.CompanyIndex),
  {
    ssr: false,
  },
);

const ListCompanyPage = () => {
  return <ListCompanyDynamic />;
};

export default ListCompanyPage;
