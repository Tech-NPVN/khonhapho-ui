import dynamic from 'next/dynamic';

const LoginDynamic = dynamic(
  () => import('@/modules/auth/components').then((res) => res.LoginIndex),
  {
    ssr: false,
  },
);

const LoginPage = () => {
  return <LoginDynamic />;
};

export default LoginPage;
