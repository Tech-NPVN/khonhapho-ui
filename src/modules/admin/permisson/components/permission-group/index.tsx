'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import { Button } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { useCallback } from 'react';
import { PermissionGroupTable } from './permission-group.table';

export const PermissionGroupIndex = () => {
  const router = useRouter();

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-4 py-1 max-lg:text-[13px] text-sm rounded-lg h-9"
        onClick={() => router.push(Routes.AdminPermission + '/group/create')}
        size="large"
      >
        Thêm mới
      </Button>
    );
  }, [router]);

  return (
    <div className="mt-5 lg:pr-3">
      <SectionBodyWithDescButton title="Quản lý nhóm quyền" btn={renderAddButton()}>
        <PermissionGroupTable />
      </SectionBodyWithDescButton>
    </div>
  );
};
