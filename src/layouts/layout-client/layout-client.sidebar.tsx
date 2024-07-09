'use client';

import { useState } from 'react';
import { MenuClick, MenuType } from './layout-client.type';
import { Layout, Menu } from 'antd';
import { Navigations, Routes } from '@/constants/enums';
import {
  ActivityNewsIcon,
  BuyUrgentlyIcon,
  ListCompanyIcon,
  RegulationIcon,
  ResourceWarehouseIcon,
} from '@/components/icons';
import { usePathname, useRouter } from 'next/navigation';

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuType[],
): MenuType => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuType;
};

const items: MenuType[] = [
  getItem(Navigations.Warehouse, Routes.Warehouse, <ResourceWarehouseIcon className="w-7" />),
  getItem(Navigations.Urgently, Routes.Urgently, <BuyUrgentlyIcon className="w-7" />),
  getItem(Navigations.ActivityNews, Routes.ActivityNews, <ActivityNewsIcon className="w-7" />, [
    getItem(Navigations.All, Routes.ActivityNewsAll),
    getItem(Navigations.Deals, Routes.ActivityNewsDeals),
    getItem(Navigations.Branch, Routes.ActivityNewsBranch),
    getItem(Navigations.Department, Routes.ActivityNewsDepartment),
    getItem(Navigations.Group, Routes.ActivityNewsGroup),
  ]),
  getItem(Navigations.Regulation, '', <RegulationIcon className="w-7" />),
  getItem(Navigations.ListCompany, '', <ListCompanyIcon className="w-7" />),
];

const LayoutClientSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick: MenuClick = (e) => {
    const clickedItem = items.find((item) => item?.key === e.key);
    if (clickedItem && !(clickedItem as any)?.children) {
      router.push(e.key);
    }
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-white"
      width={286}
    >
      <div className="py-4 px-2">
        <Menu
          defaultSelectedKeys={[pathname ?? undefined]}
          mode="inline"
          items={items}
          className="sidebar-menu"
          onClick={handleMenuClick}
        />
      </div>
    </Layout.Sider>
  );
};

export default LayoutClientSidebar;
