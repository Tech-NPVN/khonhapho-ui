import Loading from '@/app/loading';
import { SidebarProvider } from '@/components/reuse/navigation';
import dynamic from 'next/dynamic';

const LayoutAdminDynamic = dynamic(() => import('@/layouts').then((res) => res.LayoutAdmin), {
  ssr: false,
  loading: () => <Loading />,
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutAdminDynamic>
      <SidebarProvider>{children}</SidebarProvider>
    </LayoutAdminDynamic>
  );
};

export default ClientLayout;
