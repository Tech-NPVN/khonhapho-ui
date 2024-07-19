import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const LayoutAdminDynamic = dynamic(() => import('@/layouts').then((res) => res.LayoutAdmin), {
  ssr: false,
  loading: () => <Loading />,
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutAdminDynamic>{children}</LayoutAdminDynamic>;
};

export default ClientLayout;
