'use client';

import { FloatButton, Layout } from 'antd';
import LayoutAdminHeader from './layout-admin.header';
import LayoutAdminSidebar from './layout-admin.sidebar';

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>
        <LayoutAdminHeader />
        <Layout className="main-bg gap-4 flex" hasSider>
          <LayoutAdminSidebar />
          <Layout className="main-bg mt-16 flex-1">{children}</Layout>
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </>
  );
};
