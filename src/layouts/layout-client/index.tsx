'use client';

import { Routes } from '@/constants/enums';
import { FloatButton, Layout } from 'antd';
import { usePathname } from 'next/navigation';
import LayoutClientGroupChat from './layout-client.group-chat';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';

const userRoutesAccept = [
  Routes.UserAppointment,
  Routes.UserCollection,
  Routes.UserCustomers,
  Routes.UserReview,
];

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);

  const isSidebarHidden = () => {
    if (pathname.startsWith(Routes.User)) {
      if (userRoutesAccept.includes(pathname as Routes)) {
        return true;
      }
      return false;
    }
    return true;
  };
  const isShowGroupChat = () => {
    const arr = [
      // Trang chủ
      Routes.Home,
      // Khách cần mua gấp
      Routes.Urgently,
      //Tin hoạt động
      Routes.ActivityNews,
      Routes.ActivityNewsAll,
      Routes.ActivityNewsBranch,
      Routes.ActivityNewsBranch,
      Routes.ActivityNewsDeals,
      Routes.ActivityNewsDepartment,
      Routes.ActivityNewsGroup,
      // Quy định hướng dẫn
      Routes.Regulation,
      // Thư viện nhà phố
      Routes.LibNhaPho,
      Routes.LibKnowledge,
      Routes.ShareSkill,
      Routes.LibManager,
      Routes.LibOwner,
      Routes.LibAssist,
    ];
    return arr.includes(pathname as Routes);
  };
  return (
    <>
      <Layout>
        <LayoutClientHeader />
        <Layout className="main-bg gap-4 flex" hasSider>
          {isSidebarHidden() && <LayoutClientSidebar />}
          <Layout className="main-bg mt-16 flex-1">{children}</Layout>
          {isShowGroupChat() && <LayoutClientGroupChat />}
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </>
  );
};
