'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useTheme } from 'next-themes';

export const NProgressProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <ProgressBar
        key={theme}
        height="2px"
        color="#3FB44B"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};