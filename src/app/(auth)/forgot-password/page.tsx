import dynamic from 'next/dynamic';

const ForgotPasswordDynamic = dynamic(
  () => import('@/modules/auth/components').then((res) => res.ForgotPasswordIndex),
  {
    ssr: false,
  },
);

const ForgotPasswordPage = () => {
  return <ForgotPasswordDynamic />;
};

export default ForgotPasswordPage;
