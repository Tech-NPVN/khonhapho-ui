'use client';

import {
  AlarmIcon,
  BellIcon,
  CollectionIcon,
  FreeWarehouseIcon,
  HomeIcon,
  MainInfoWarehouseIcon,
  MenuIcon,
  MessengerIcon,
  PersonalWarehouseIcon,
} from '@/components/icons';
import { Breakpoint, Routes } from '@/constants/enums';
import { Button, Layout, Menu, MenuTheme } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect, useState } from 'react';
import { IMAGE_SAMPLE } from '@/constants/data';
import { useTheme } from 'next-themes';
import { MenuType } from '../layout.type';
import { PopoverAppointment, PopoverMessage, PopoverNotification, PopoverUser } from '../popover';
import DrawerMenu from '../drawer-menu';
import ScrollContainer from 'react-indiana-drag-scroll';
import { itemsClient } from '../layout.const';
import { useWindowSize } from 'react-use';

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
  const router = useRouter();
  const pathname = usePathname();
  const windows = useWindowSize();

  // Active pathname currently state
  const [current, setCurrent] = useState<string>(pathname);

  // Popover state
  const [openPopoverUser, setOpenPopoverUser] = useState<boolean>(false);
  const [openPopoverNoti, setOpenPopoverNoti] = useState<boolean>(false);
  const [openPopoverMessage, setOpenPopoverMessage] = useState<boolean>(false);
  const [openPopoverAppointment, setOpenPopoverAppointment] = useState<boolean>(false);

  // Menu bar state
  const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <Layout.Header className="px-4 border-b-divider_l dark:border-b-divider_d shadow-lg bg-white dark:bg-primary_color_d grid grid-cols-2 lg:grid-cols-3 z-50 fixed top-0 w-full transition-all">
      <Link href={Routes.Home} className="w-min">
        {theme === 'light' ? (
          <Image
            src="/logo-light.png"
            height={40}
            width={0}
            alt="logo-light"
            unoptimized
            className="w-auto"
          />
        ) : (
          <Image
            src="/logo-dark.png"
            height={40}
            width={0}
            alt="logo-dark"
            unoptimized
            className="w-auto"
          />
        )}
      </Link>

      {windows.width >= Breakpoint.Lg && (
        <div className="flex items-center justify-center dark:bg-primary_color_d">
          <Menu
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            mode="horizontal"
            items={renderMenu(pathname)}
            className="[&>li]:w-28 [&>li]:flex [&>li]:justify-center [&>li>span]:hidden dark:bg-primary_color_d"
          />
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        {/* Appointment (Lịch hẹn) */}
        <PopoverAppointment open={openPopoverAppointment} setOpen={setOpenPopoverAppointment}>
          <Button
            icon={<AlarmIcon />}
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 dark:bg-background_d shadow-btn"
          />
        </PopoverAppointment>

        {/* Message (Tin nhắn) */}
        <PopoverMessage open={openPopoverMessage} setOpen={setOpenPopoverMessage}>
          <Button
            icon={<MessengerIcon />}
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 dark:bg-background_d shadow-btn"
          />
        </PopoverMessage>

        {/* Notification (Thông báo) */}
        <PopoverNotification open={openPopoverNoti} setOpen={setOpenPopoverNoti}>
          <Button
            icon={<BellIcon />}
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 dark:bg-background_d shadow-btn"
          />
        </PopoverNotification>

        {/* User (Avatar người dùng) */}
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

        {/* Menu (Điều hướng responsive) */}
        <div className="block lg:hidden">
          <Button
            icon={<MenuIcon />}
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 dark:bg-background_d shadow-btn "
            onClick={() => setOpenMenuBar(true)}
          />
        </div>

        <DrawerMenu open={openMenuBar} handleClose={() => setOpenMenuBar(false)}>
          <ScrollContainer className="overflow-y-scroll flex-1">
            <Menu
              theme={theme as MenuTheme}
              selectedKeys={[pathname ?? undefined]}
              mode="inline"
              items={itemsClient}
              className={`border-0 bg-transparent pb-2`}
              onClick={(e) => {
                e.domEvent.stopPropagation();

                if (e.key === 'logout') {
                  // call logout function...
                  return router.push(Routes.Login);
                }

                router.push(e.key);
                setOpenMenuBar(false);
              }}
            />
          </ScrollContainer>
        </DrawerMenu>
      </div>
    </Layout.Header>
  );
};

export default LayoutClientHeader;
