import dynamic from 'next/dynamic';
import Loading from '../loading';

const LayoutAuthDynamic = dynamic(() => import('@/layouts').then((res) => res.LayoutAuth), {
  ssr: false,
  loading: () => <Loading />,
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutAuthDynamic>{children}</LayoutAuthDynamic>;
};

export default AuthLayout;
