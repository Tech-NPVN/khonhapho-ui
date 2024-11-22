'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, CollapseIcon, SearchIcon } from '@/components/icons';
import { Navigations } from '@/constants/enums';
import { Button, Input, Tooltip } from 'antd';
import { SaleStatusTable } from './sale-status.table';
import { SaleStatusForm } from './sale-status.form';
import { useCallback, useState } from 'react';
import { useSidebar } from '@/components/reuse/navigation';

const TITLE = Navigations.DataWarehouseSaleStatus;

export const SaleStatusIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { collapsed, toggleCollapse } = useSidebar();

  const renderTitle = useCallback(() => {
    if (collapsed) {
      return (
        <div className="flex items-center gap-3">
          <Tooltip title="Mở rộng" placement="bottom">
            <Button
              type="text"
              icon={<CollapseIcon className="rotate-180" />}
              onClick={toggleCollapse}
            />
          </Tooltip>
          <span>{TITLE}</span>
        </div>
      );
    }

    return TITLE;
  }, [collapsed, toggleCollapse]);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-5 max-lg:text-[13px]"
        onClick={() => setOpenCreate(true)}
      >
        Thêm mới
      </Button>
    );
  }, []);

  return (
    <>
      <SectionBodyWithDescButton title={renderTitle()} btn={renderAddButton()}>
        <div className="flex justify-end">
          <Input
            size="large"
            placeholder="Nhập nội dung tìm kiếm"
            prefix={<SearchIcon className="w-4 h-4" />}
            className="sm:w-[320px] w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
          />
        </div>

        <SaleStatusTable />
      </SectionBodyWithDescButton>

      <SaleStatusForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
