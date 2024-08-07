'use client';

import {
  AlarmIcon,
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
import { IMAGE_SAMPLE } from '@/constants/data';
import { useTheme } from 'next-themes';
import { MenuType } from '../layout.type';
import { PopoverUser } from '../popover';

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
      icon: <HomeIcon className="[&>path]:!fill-color_l" />,
    },
    {
      route: Routes.UserCollection,
      icon: <CollectionIcon className="[&>rect]:!stroke-color_l [&>path]:!stroke-color_l" />,
    },
    {
      route: Routes.Warehouse,
      icon: (
        <PersonalWarehouseIcon className="[&>path]:!stroke-color_l [&>path[data-path='3']]:!fill-color_l" />
      ),
    },
    {
      route: Routes.StockConsignment,
      icon: (
        <MainInfoWarehouseIcon
          className="[&>circle]:!fill-color_l [&>rect]:!fill-color_l [&>path[data-path='4']]:!fill-color_l
        [&>path[data-path='2']]:!stroke-color_l first:[&>path]:!fill-color_l"
        />
      ),
    },
    {
      route: Routes.StockNovendors,
      icon: (
        <FreeWarehouseIcon
          className="[&>circle]:!fill-color_l [&>rect]:!fill-color_l [&>rect[data-rect='1']]:!fill-primary_color_l 
          [&>path[data-path='3']]:!fill-color_l [&>path[data-path='2']]:!stroke-color_l first:[&>path]:!fill-color_l"
        />
      ),
    },
  ];

  return menuItems.map((item) => generateMenuItem(item.route, item.icon, pathname === item.route));
};

const LayoutClientHeader = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [current, setCurrent] = useState<string>(pathname);

  const [openPopoverUser, setOpenPopoverUser] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <Layout.Header className="px-3 border-b-divider_l dark:border-b-divider_d shadow-lg bg-white dark:bg-primary_color_d grid grid-cols-3 z-50 fixed top-0 w-full">
      <Link href={Routes.Home} className="w-min">
        {theme === 'light' ? (
          <Image src="/logo-light.png" height={40} width={43} alt="logo" />
        ) : (
          <Image src="/logo-dark.png" height={40} width={43} alt="logo" />
        )}
      </Link>
      <div className="flex items-center justify-center dark:bg-primary_color_d">
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="horizontal"
          items={renderMenu(pathname)}
          className="[&>li]:w-28 [&>li]:flex [&>li]:justify-center [&>li>span]:hidden dark:bg-primary_color_d"
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          icon={<AlarmIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 dark:bg-background_d shadow-btn"
        />
        <Button
          icon={<MessengerIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 dark:bg-background_d shadow-btn"
        />
        <Button
          icon={<BellIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 dark:bg-background_d shadow-btn"
        />

        <PopoverUser open={openPopoverUser} setOpen={setOpenPopoverUser}>
          <Button
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 overflow-hidden shadow-btn"
          >
            <Image src={IMAGE_SAMPLE} height={40} width={40} alt="avatar" />
          </Button>
        </PopoverUser>
      </div>
    </Layout.Header>
  );
};

export default LayoutClientHeader;
