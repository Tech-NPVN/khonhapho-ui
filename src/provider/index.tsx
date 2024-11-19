'use client';

import ThemeProvider from './theme.provider';
import { ConfigProvider } from './config.provider';
import { NProgressProvider } from './nprogress.provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      themes={['light', 'dark']}
      defaultTheme="light"
      disableTransitionOnChange
    >
      <ConfigProvider>
        <NProgressProvider>{children}</NProgressProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
