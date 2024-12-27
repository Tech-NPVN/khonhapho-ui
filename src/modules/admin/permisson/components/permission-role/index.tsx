'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import { Button } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { useCallback } from 'react';
import { PermissionRoleTable } from './permission-role.table';

export const PermissionRoleIndex = () => {
  const router = useRouter();

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-4 py-1 max-lg:text-[13px] text-sm rounded-lg h-9"
        onClick={() => router.push(Routes.AdminPermission + '/role/create')}
        size="large"
      >
        Thêm mới
      </Button>
    );
  }, [router]);

  return (
    <div className="mt-5 lg:pr-3">
      <SectionBodyWithDescButton title="Phân quyền theo chức danh" btn={renderAddButton()}>
        <PermissionRoleTable />
      </SectionBodyWithDescButton>
    </div>
  );
};
