'use client';

import { BellIcon, MenuIcon } from '@/components/icons';
import { IMAGE_SAMPLE } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { Button, Layout, Menu, MenuTheme } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PopoverNotification, PopoverUser } from '../popover';
import DrawerMenu from '../drawer-menu';
import ScrollContainer from 'react-indiana-drag-scroll';
import { usePathname, useRouter } from 'next/navigation';
import { itemsAdmin } from '../layout.const';

const LayoutAdminHeader = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Popover
  const [openPopoverUser, setOpenPopoverUser] = useState<boolean>(false);
  const [openPopoverNoti, setOpenPopoverNoti] = useState<boolean>(false);

  // Menu bar state
  const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);

  return (
    <Layout.Header className="px-3 border-b-divider_l dark:border-b-divider_d shadow-lg bg-white dark:bg-primary_color_d flex justify-between z-50 fixed top-0 w-full">
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

      <div className="flex items-center justify-end gap-3">
        {/* Notification */}
        <PopoverNotification open={openPopoverNoti} setOpen={setOpenPopoverNoti}>
          <Button
            icon={<BellIcon />}
            type="text"
            shape="round"
            size="large"
            className="w-10 h-10 dark:bg-background_d shadow-btn"
          />
        </PopoverNotification>

        {/* User */}
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
              items={itemsAdmin}
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

export default LayoutAdminHeader;
