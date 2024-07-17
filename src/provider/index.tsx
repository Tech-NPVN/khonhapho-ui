'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, type ThemeConfig } from 'antd';
import ThemeProvider from './theme.provider';
import { sfProPlayFont } from '@/configs/font.config';

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#3FB44B',
    fontFamily: sfProPlayFont.style.fontFamily,
  },
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider theme={themeConfig}>
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
