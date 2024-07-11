import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import seGoeUiFont from '@/configs/font.config';
import { LayoutClient } from '@/layouts';
import AppProvider from '@/provider';
import Favicon from '~public/favicon.ico';
import './globals.css';

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
    <html lang="en">
      <head />
      <body className={seGoeUiFont.className} id="app">
        <AntdRegistry>
          <AppProvider>
            <LayoutClient>{children}</LayoutClient>
          </AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
