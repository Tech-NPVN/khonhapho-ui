'use client';

import { Layout } from 'antd';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <LayoutClientHeader />
      <Layout className='gap-4' hasSider>
        <LayoutClientSidebar />
        <Layout>{children}</Layout>
      </Layout>
    </Layout>
  );
}; 
