'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        {children}
      </StyleProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
