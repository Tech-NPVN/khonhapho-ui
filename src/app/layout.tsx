import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { sfProPlayFont } from '@/configs/font.config';
import AppProvider from '@/provider';
import Favicon from '~public/favicon.ico';

import '@/styles/globals.css';
import '@/styles/index.css';

export const metadata: Metadata = {
  title: 'Nhà Phố Việt Nam',
  description: 'Nhà Phố Việt Nam',
  icons: {
    icon: {
      url: Favicon.src,
      type: 'image/png',
    },
    shortcut: { url: Favicon.src, type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }} className="light" suppressHydrationWarning>
      <head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={sfProPlayFont.className} id="app">
        <AntdRegistry>
          <AppProvider>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
