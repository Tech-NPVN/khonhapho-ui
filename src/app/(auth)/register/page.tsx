import dynamic from 'next/dynamic';

const RegisterDynamic = dynamic(
  () => import('@/modules/auth/components').then((res) => res.RegisterIndex),
  {
    ssr: false,
  },
);

const RegisterPage = () => {
  return <RegisterDynamic />;
};

export default RegisterPage;
