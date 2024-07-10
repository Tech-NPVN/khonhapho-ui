'use client';

import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DarkIcon } from '@/components/icons';
import { usePathname, useRouter } from 'next/navigation';
import { getItem, items, itemsBottom } from './layout-client.const';

const LayoutClientSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-white h-[calc(100vh-64px)] overflow-auto fixed left-0 bottom-0"
      width={286}
    >
      <div className="flex flex-col py-4 px-3 h-full relative">
        <Menu
          selectedKeys={[pathname ?? undefined]}
          mode="inline"
          items={items}
          className={`border-0 flex-1 ${
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
          defaultSelectedKeys={undefined}
          mode="inline"
          items={[
            ...itemsBottom,
            getItem(
              'Chế độ tối',
              'mode',
              <DarkIcon className="w-7" />,
              undefined,
              'sidebar-item [&.ant-menu-item-selected]:bg-transparent flex-row-reverse',
            ),
          ]}
          className={`border-0 sticky bottom-4 pt-5 ${collapsed ? 'sidebar-item-collapse' : ''}`}
          onClick={(e) => {
            if (e.key === 'collapse') {
              setCollapsed((prev) => !prev);
            } else if (e.key === 'mode') {
              return;
            }
          }}
        />
      </div>
    </Layout.Sider>
  );
};

export default LayoutClientSidebar;
