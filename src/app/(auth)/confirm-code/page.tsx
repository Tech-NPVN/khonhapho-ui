import dynamic from 'next/dynamic';

const ConfirmCodeDynamic = dynamic(
  () => import('@/modules/auth/components').then((res) => res.ConfirmCodeIndex),
  {
    ssr: false,
  },
);

const ConfirmCodePage = () => {
  return <ConfirmCodeDynamic />;
};

export default ConfirmCodePage;
