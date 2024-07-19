import dynamic from 'next/dynamic';
import Loading from '../loading';

const LayoutClientDynamic = dynamic(() => import('@/layouts').then((res) => res.LayoutClient), {
  ssr: false,
  loading: () => <Loading />,
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutClientDynamic>{children}</LayoutClientDynamic>;
};

export default ClientLayout;
