'use client';

import { CollapseIcon } from '@/components/icons';
import { Breakpoint } from '@/constants/enums';
import { MenuType } from '@/layouts';
import { Button, Layout, Menu, MenuTheme } from 'antd';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useWindowSize } from 'react-use';
import { useSidebar } from './sidebar.context';

export const SidebarLayout = ({ menu, children }: { menu: MenuType[]; children: ReactNode }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowSize();

  const { collapsed, toggleCollapse, setCollapsed } = useSidebar();

  useEffect(() => {
    return () => setCollapsed(false);
  }, []);

  useEffect(() => {
    if (width < Breakpoint.Lg) {
      setCollapsed(true);
    }
  }, [width]);

  return (
    <Layout className={`${!collapsed ? 'gap-5' : ''} flex bg-transparent mt-5 lg:pr-4`} hasSider>
      <Layout.Sider
        collapsed={collapsed}
        className={`bg-primary_color_l dark:bg-primary_color_d h-[calc(100vh-100px)] lg:sticky top-[84px] bottom-0 lg:left-0 rounded-md lg:block fixed transition-all ease-in-out z-[999] shadow ${
          collapsed
            ? `-left-2/4 ${width < Breakpoint.Lg ? 'duration-700' : 'duration-200'}`
            : 'left-0 duration-200'
        }`}
        width={220}
        collapsedWidth={0}
      >
        <div className="flex flex-col gap-2 py-2 px-3">
          <div className="flex justify-between items-center px-1">
            <span className="flex-shrink-0">Thu gọn</span>
            <Button type="text" icon={<CollapseIcon />} onClick={toggleCollapse} />
          </div>
          <ScrollContainer className="overflow-y-scroll flex-1">
            <Menu
              theme={theme as MenuTheme}
              selectedKeys={[pathname ?? undefined]}
              mode="inline"
              items={menu}
              className={`border-0 bg-transparent ${
                collapsed ? 'sidebar-item-collapse sidebar-item-dropdown-collapse' : ''
              }`}
              onClick={(e) => {
                e.domEvent.stopPropagation();
                router.push(e.key);
              }}
            />
          </ScrollContainer>
        </div>
      </Layout.Sider>

      <Layout className="main-bg">{children}</Layout>
    </Layout>
  );
};
