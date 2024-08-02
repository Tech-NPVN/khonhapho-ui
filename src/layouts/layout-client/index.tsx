'use client';

import { FloatButton, Layout } from 'antd';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>
        <LayoutClientHeader />
        <Layout className="main-bg gap-4 flex" hasSider>
          <LayoutClientSidebar />
          <Layout className="main-bg mt-16 flex-1">{children}</Layout>
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </>
  );
};
