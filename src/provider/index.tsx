'use client';

import ThemeProvider from './theme.provider';
import { ConfigProvider } from './config.provider';
import { ReactQueryProvider } from './react-query.provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        themes={['light', 'dark']}
        defaultTheme="light"
        disableTransitionOnChange
      >
        <ConfigProvider>{children}</ConfigProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;
