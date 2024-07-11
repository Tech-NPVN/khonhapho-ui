'use client';

import { Layout } from 'antd';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <LayoutClientHeader />
      <Layout className="main-bg gap-4" hasSider>
        <LayoutClientSidebar />
        <Layout className="main-bg mt-16">{children}</Layout>
      </Layout>
    </Layout>
  );
};
