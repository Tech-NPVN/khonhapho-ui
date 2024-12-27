'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon } from '@/components/icons';
import { Button} from 'antd';
import { useCallback, useState } from 'react';
import { PermissionTypeTable } from './permission-type.table';
import { PermissionTypeForm } from './permission-type.form';

export const PermissionTypeIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-4 py-1 max-lg:text-[13px] text-sm rounded-lg h-9"
        onClick={() => setOpenCreate(true)}
        size="large"
      >
        Thêm mới
      </Button>
    );
  }, []);

  return (
    <>
      <div className="mt-5 lg:pr-3">
        <SectionBodyWithDescButton title="Quản lý loại quyền" btn={renderAddButton()}>
          <PermissionTypeTable />
        </SectionBodyWithDescButton>
      </div>

      <PermissionTypeForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
