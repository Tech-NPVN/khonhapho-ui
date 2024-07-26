'use client';

import { useMemo, useState } from 'react';
import { Layout, Menu, type MenuTheme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Routes } from '@/constants/enums';
import { itemsBottom, itemsClient } from '../layout.const';
import ScrollContainer from 'react-indiana-drag-scroll';

const LayoutClientSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);

  const isLightMode = useMemo(() => {
    return theme === 'light';
  }, [theme]);

  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-primary_color_l dark:bg-primary_color_d h-[calc(100vh-64px)] overflow-hidden mt-16 sticky top-16 bottom-0 left-0"
      width={286}
    >
      <div className="flex flex-col py-2 px-3 h-full relative">
        <ScrollContainer className='overflow-y-scroll flex-1'>
          <Menu
            theme={theme as MenuTheme}
            selectedKeys={[pathname ?? undefined]}
            mode="inline"
            items={itemsClient}
            className={`border-0 bg-transparent pb-2 ${
              collapsed ? 'sidebar-item-collapse sidebar-item-dropdown-collapse' : ''
            }`}
            onClick={(e) => {
              e.domEvent.stopPropagation();

              if (e.key === 'logout') {
                // call logout function...
                return router.push(Routes.Login);
              }
              router.push(e.key);
            }}
          />
        </ScrollContainer>

        <Menu
          theme={theme as MenuTheme}
          defaultSelectedKeys={undefined}
          mode="inline"
          items={itemsBottom(isLightMode)}
          className={`border-0 bg-primary_color_l dark:bg-primary_color_d sticky bottom-4 ${
            collapsed ? 'sidebar-item-collapse' : ''
          }`}
          onClick={(e) => {
            if (e.key === 'collapse') {
              setCollapsed((prev) => !prev);
            } else if (e.key === 'mode') {
              isLightMode ? setTheme('dark') : setTheme('light');
            }
          }}
        />
      </div>
    </Layout.Sider>
  );
};

export default LayoutClientSidebar;
