'use client';

import { useState } from 'react';
import { Layout, Menu, type MenuTheme } from 'antd';
import { DarkIcon, LightIcon } from '@/components/icons';
import { usePathname, useRouter } from 'next/navigation';
import { getItem, items, itemsBottom } from './layout-client.const';
import { useTheme } from 'next-themes';

const LayoutClientSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);

  const isLightMode = theme === 'light';

  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-white dark:bg-primary_color_d h-[calc(100vh-64px)] overflow-auto fixed left-0 bottom-0"
      width={286}
    >
      <div className="flex flex-col py-4 px-3 h-full relative">
        <Menu
          theme={theme as MenuTheme}
          selectedKeys={[pathname ?? undefined]}
          mode="inline"
          items={items}
          className={`border-0 flex-1 bg-transparent ${
            collapsed ? 'sidebar-item-collapse sidebar-item-dropdown-collapse' : ''
          }`}
          onClick={(e) => {
            e.domEvent.stopPropagation();
            if (e.key === 'logout') {
              return;
            }
            router.push(e.key);
          }}
        />

        <Menu
          theme={theme as MenuTheme}
          defaultSelectedKeys={undefined}
          mode="inline"
          items={[
            ...itemsBottom,
            getItem(
              `Chế độ ${isLightMode ? 'tối' : 'sáng'}`,
              'mode',
              isLightMode ? <DarkIcon className="w-7" /> : <LightIcon className="w-7" />,
              undefined,
              'sidebar-item [&.ant-menu-item-selected]:bg-transparent flex-row-reverse',
            ),
          ]}
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
