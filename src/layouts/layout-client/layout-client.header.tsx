'use client';

import {
  BellIcon,
  CollectionIcon,
  FreeWarehouseIcon,
  HomeIcon,
  MainInfoWarehouseIcon,
  MessengerIcon,
  PersonalWarehouseIcon,
} from '@/components/icons';
import { Routes } from '@/constants/enums';
import { Button, Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MenuType } from './layout-client.type';
import { IMAGE_SAMPLE } from '@/constants/data';

const generateMenuItem = (route: string, icon: JSX.Element, isActive: boolean) => ({
  key: route,
  icon: (
    <div className="p-[18px]">
      <Link href={route}>
        {React.cloneElement(icon, {
          className: isActive ? icon.props.className : '',
        })}
      </Link>
    </div>
  ),
});

const renderMenu = (pathname: string): MenuType[] => {
  const menuItems = [
    {
      route: Routes.Home,
      icon: <HomeIcon className="[&>path]:fill-color_l" />,
    },
    {
      route: Routes.Collection,
      icon: <CollectionIcon className="[&>rect]:stroke-color_l [&>path]:stroke-color_l" />,
    },
    {
      route: Routes.Warehouse,
      icon: (
        <PersonalWarehouseIcon className="[&>path]:stroke-color_l [&>path[data-path='3']]:fill-color_l" />
      ),
    },
    {
      route: Routes.StockConsignment,
      icon: (
        <MainInfoWarehouseIcon
          className="[&>circle]:fill-color_l [&>rect]:fill-color_l [&>path[data-path='4']]:fill-color_l
        [&>path[data-path='2']]:stroke-color_l first:[&>path]:fill-color_l"
        />
      ),
    },
    {
      route: Routes.StockNovendors,
      icon: (
        <FreeWarehouseIcon
          className="[&>circle]:fill-color_l [&>rect]:fill-color_l [&>rect[data-rect='1']]:fill-white 
          [&>path[data-path='3']]:fill-color_l [&>path[data-path='2']]:stroke-color_l first:[&>path]:fill-color_l"
        />
      ),
    },
  ];

  return menuItems.map((item) => generateMenuItem(item.route, item.icon, pathname === item.route));
};

const LayoutClientHeader = () => {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string>(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <Layout.Header className="px-3 shadow-lg bg-white grid grid-cols-3 z-10 fixed top-0 w-full">
      <Link href={Routes.Home} className="w-min">
        <Image src="/logo-white-mode.jpg" height={40} width={43} alt="logo" />
      </Link>
      <div className="flex items-center justify-center">
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="horizontal"
          items={renderMenu(pathname)}
          className="[&>li]:w-28 [&>li]:flex [&>li]:justify-center [&>li>span]:hidden"
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          icon={<MessengerIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 shadow-sm"
        />
        <Button
          icon={<BellIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 shadow-sm"
        />
        <Button
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 shadow-sm overflow-hidden"
        >
          <Image src={IMAGE_SAMPLE} height={40} width={40} alt="avatar" />
        </Button>
      </div>
    </Layout.Header>
  );
};

export default LayoutClientHeader;
