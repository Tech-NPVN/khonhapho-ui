import dynamic from 'next/dynamic';

const ContractTypeDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.ContractTypeIndex),
  {
    ssr: false,
  },
);

const ContractTypePage = () => {
  return <ContractTypeDynamic />;
};

export default ContractTypePage;
