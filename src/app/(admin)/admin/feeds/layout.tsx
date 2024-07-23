import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { FeedsProvider } from '@/modules/admin/feeds/context';

const FeedsLayoutDynamic = dynamic(
  () => import('@/modules/admin/feeds/layout').then((res) => res.AdminFeedsLayout),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FeedsProvider>
      <FeedsLayoutDynamic>{children}</FeedsLayoutDynamic>
    </FeedsProvider>
  );
};

export default FeedsLayout;
