'use client';

import { FloatButton, Layout } from 'antd';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';
import { usePathname } from 'next/navigation';
import { Routes } from '@/constants/enums';

const userRoutesAccept = [
  Routes.UserAppointment,
  Routes.UserCollection,
  Routes.UserCustomers,
  Routes.UserReview,
];

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isSidebarHidden = () => {
    if (pathname.startsWith(Routes.User)) {
      if (userRoutesAccept.includes(pathname as Routes)) {
        return true;
      }
      return false;
    }
    return true;
  };

  return (
    <>
      <Layout>
        <LayoutClientHeader />
        <Layout className="main-bg gap-4 flex" hasSider>
          {isSidebarHidden() && <LayoutClientSidebar />}
          <Layout className="main-bg mt-16 flex-1">{children}</Layout>
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </>
  );
};
