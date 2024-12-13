'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, SearchIcon } from '@/components/icons';
import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
import { StickerTable } from './sticker.table';
import { StickerForm } from './sticker.form';

export const SettingsStickerIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-5 max-lg:text-[13px]"
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
        <SectionBodyWithDescButton title="Quản lý sticker" btn={renderAddButton()}>
          <div className="flex justify-end">
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={<SearchIcon className="w-4 h-4" />}
              className="sm:w-[320px] w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
            />
          </div>

          <StickerTable />
        </SectionBodyWithDescButton>
      </div>

      <StickerForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
