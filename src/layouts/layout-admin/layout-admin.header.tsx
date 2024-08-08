'use client';

import { BellIcon } from '@/components/icons';
import { IMAGE_SAMPLE } from '@/constants/data';
import { Routes } from '@/constants/enums';
import { Button, Layout } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PopoverNotification, PopoverUser } from '../popover';

const LayoutAdminHeader = () => {
  const { theme } = useTheme();

  // Popover
  const [openPopoverUser, setOpenPopoverUser] = useState<boolean>(false);
  const [openPopoverNoti, setOpenPopoverNoti] = useState<boolean>(false);

  return (
    <Layout.Header className="px-3 border-b-divider_l dark:border-b-divider_d shadow-lg bg-white dark:bg-primary_color_d flex justify-between z-50 fixed top-0 w-full">
      <Link href={Routes.Home} className="w-min">
        {theme === 'light' ? (
          <Image src="/logo-light.png" height={40} width={43} alt="logo" />
        ) : (
          <Image src="/logo-dark.png" height={40} width={43} alt="logo" />
        )}
      </Link>

      <div className="flex items-center justify-end gap-3">
        <Button
          icon={<BellIcon />}
          type="text"
          shape="round"
          size="large"
          className="w-10 h-10 dark:bg-background_d shadow-btn"
        />

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
      </div>
    </Layout.Header>
  );
};

export default LayoutAdminHeader;
