'use client';

import { Layout } from 'antd';
import LayoutClientHeader from './layout-client.header';
import LayoutClientSidebar from './layout-client.sidebar';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <LayoutClientHeader />

      <Layout className='h-[calc(100vh-64px)] gap-4'>
        <LayoutClientSidebar />
        <Layout>{children}</Layout>
      </Layout>
    </Layout>
  );
}; 
