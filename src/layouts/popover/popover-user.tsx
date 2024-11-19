import { Divider, Popover } from 'antd';
import React, { memo, useCallback } from 'react';
import { PopoverProps } from '../layout.type';
import {
  BuyUrgentlyIcon,
  LogoutIcon,
  MntGuestIcon,
  PersonalNormalIcon,
  ResourceWarehouseIcon,
} from '@/components/icons';
import Link from 'next/link';
import { Routes } from '@/constants/enums';
import { useRouter } from 'next-nprogress-bar';

export const PopoverUser = memo(({ children, open, setOpen }: PopoverProps) => {
  const router = useRouter();

  const renderContent = useCallback(() => {
    return (
      <ul className="list-none flex flex-col gap-3 px-1 m-0">
        <li>
          <Link
            href={Routes.UserProfile}
            className="flex gap-3 items-center text-primary_text_l dark:text-primary_text_d"
            onClick={() => setOpen(false)}
          >
            <PersonalNormalIcon width="20" height="20" />
            <span>Trang cá nhân</span>
          </Link>
        </li>

        <li>
          <Link
            href={Routes.Warehouse}
            className="flex gap-3 items-center text-primary_text_l dark:text-primary_text_d"
            onClick={() => setOpen(false)}
          >
            <ResourceWarehouseIcon width="20" height="20" />
            <span>Kho tài nguyên</span>
          </Link>
        </li>

        <li>
          <Link
            href={Routes.Urgently}
            className="flex gap-3 items-center text-primary_text_l dark:text-primary_text_d"
            onClick={() => setOpen(false)}
          >
            <BuyUrgentlyIcon width="20" height="20" />
            <span>Khách cần mua gấp</span>
          </Link>
        </li>

        <li>
          <Link
            href={Routes.UserCustomers}
            className="flex gap-3 items-center text-primary_text_l dark:text-primary_text_d"
            onClick={() => setOpen(false)}
          >
            <MntGuestIcon width="20" height="auto" />
            <span>QL khách - Tự khớp khách</span>
          </Link>
        </li>

        <Divider className="bg-background_l dark:bg-divider_d/40 m-0" />

        <li>
          <button
            className="flex w-full px-0 border-0 bg-transparent gap-3 items-center text-primary_text_l dark:text-primary_text_d cursor-pointer"
            onClick={() => {
              router.push(Routes.Login);
              setOpen(false);
            }}
          >
            <LogoutIcon width="20" height="auto" />
            <span>Đăng xuất</span>
          </button>
        </li>
      </ul>
    );
  }, [router, setOpen]);

  return (
    <Popover
      open={open}
      content={renderContent()}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottomRight"
    >
      {children}
    </Popover>
  );
});

PopoverUser.displayName = PopoverUser.name;
