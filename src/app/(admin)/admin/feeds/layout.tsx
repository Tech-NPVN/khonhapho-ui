import Loading from '@/app/loading';
import { itemsAdminFeeds } from '@/modules/admin/feeds/feeds.const';
import dynamic from 'next/dynamic';

// const FeedsLayoutDynamic = dynamic(
//   () => import('@/modules/admin/feeds/layout').then((res) => res.AdminFeedsLayout),
//   {
//     ssr: false,
//     loading: () => <Loading />,
//   },
// );

const FeedsLayoutDynamic = dynamic(
  () => import('@/components/reuse/navigation').then((res) => res.SidebarLayout),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const FeedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <FeedsProvider>
    <FeedsLayoutDynamic menu={itemsAdminFeeds}>{children}</FeedsLayoutDynamic>
    // </FeedsProvider>
  );
};

export default FeedsLayout;
