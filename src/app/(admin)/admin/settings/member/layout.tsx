import Loading from '@/app/loading';
import { menuSettingsMember } from '@/modules/admin/settings/settings.const';
import dynamic from 'next/dynamic';

const MemberLayoutDynamic = dynamic(
  () => import('@/components/reuse/navigation').then((res) => res.SidebarLayout),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

const MemberLayout = ({ children }: { children: React.ReactNode }) => {
  return <MemberLayoutDynamic menu={menuSettingsMember}>{children}</MemberLayoutDynamic>;
};

export default MemberLayout;
