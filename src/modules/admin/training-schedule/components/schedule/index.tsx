'use client';

import { ModalClassInformation } from '@/common/modal/modal-class-information.form';
import { SectionBody } from '@/components/common';
import { AddIcon, ReloadDownIcon } from '@/components/icons';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { ScheduleTable } from './schedule.table';
const ScheduleTitle = () => {
  const [isShowClassInformationModal, setIsShowClassInformationModal] = useState<boolean>(false);

  return (
    <>
      <span className="flex items-center justify-between">
        <span>Lịch đào tạo</span>
        <Button
          className="h-10"
          type="primary"
          onClick={() => setIsShowClassInformationModal(true)}
        >
          <AddIcon /> Thêm mới
        </Button>
      </span>
      <ModalClassInformation
        open={isShowClassInformationModal}
        onClose={() => setIsShowClassInformationModal(false)}
        type={'create'}
      />
    </>
  );
};
const Schedule = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <div className="my-5">
      <SectionBody title={ScheduleTitle()}>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-3">
          <SearchInput
            placeholder="Tìm kiếm"
            value={searchInput}
            onSearch={(value) => {
              setSearchInput(value);
            }}
            onClear={() => {
              setSearchInput('');
            }}
            onChange={(value) => setSearchInput(value)}
          />
          <Select
            placeholder="Khu vực tất cả khu vực"
            className="h-10 [&_.ant-select-selector]:!rounded-xl"
          />
          <Input className="!rounded-xl h-10" placeholder="Hội trường đào tạo" />

          <Button
            type="dashed"
            className="border-solid h-10 [&_path]:hover:fill-color_l [&span]:hover:text-color_l !duration-0 dark:bg-transparent rounded-xl dark:border-white/15"
          >
            <span className="flex gap-2 items-center dark:text-secondary_text_d">
              <ReloadDownIcon width={14} height={14} />
              Đặt lại
            </span>
          </Button>
        </div>
        <div className="mt-4">
          <ScheduleTable />
        </div>
      </SectionBody>
    </div>
  );
};

export { Schedule };
