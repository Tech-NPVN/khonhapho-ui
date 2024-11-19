'use client';

import { CollapseIcon } from '@/components/icons';
import { useSidebar } from '@/components/reuse/navigation';
import { Button, Layout, Menu, type MenuTheme } from 'antd';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import ScrollContainer from 'react-indiana-drag-scroll';
import { itemsAdminFeeds } from '../feeds.const';

export const AdminFeedsLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { collapsed, toggleCollapse } = useSidebar();

  return (
    <Layout className={`${!collapsed ? 'gap-5' : ''} flex bg-transparent mt-5 pr-4`} hasSider>
      <Layout.Sider
        collapsed={collapsed}
        className="bg-primary_color_l dark:bg-primary_color_d h-[calc(100vh-100px)] sticky top-[84px] bottom-0 left-0 rounded-md"
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
              items={itemsAdminFeeds}
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
