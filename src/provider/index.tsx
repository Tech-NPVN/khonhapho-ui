'use client';

import ThemeProvider from './theme.provider';
import { ConfigProvider } from './config.provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      themes={['light', 'dark']}
      defaultTheme="light"
      disableTransitionOnChange
    >
      <ConfigProvider>{children}</ConfigProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
