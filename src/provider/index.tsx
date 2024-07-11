'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import ThemeProvider from './theme.provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        <ThemeProvider
          attribute="class"
          themes={['light', 'dark']}
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
