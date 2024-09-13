import { sfProPlayFont } from '@/configs/font.config';
import AppProvider from '@/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" style={{ colorScheme: 'light' }} className="light" suppressHydrationWarning>
      <head />
      <body className={sfProPlayFont.className} id="app">
        <AntdRegistry>
          <AppProvider>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
