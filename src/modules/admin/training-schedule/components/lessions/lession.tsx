'use client';

import { ModalLessionForm } from '@/common/modal/modal-lession.form';
import { SectionBody } from '@/components/common';
import { AddIcon } from '@/components/icons';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { Button } from 'antd';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import { LessionTable } from './lession.table';
const LessionTitle = () => {
  const [isShowClassInformationModal, setIsShowClassInformationModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const { width } = useWindowSize();
  return (
    <>
      <div className="flex items-center justify-between">
        <span>TÀI LIỆU</span>
        <div className="flex items-center gap-3">
          {width >= 500 && (
            <div className="w-[200px] sm:w-[280px]">
              <SearchInput
                value={searchInput}
                onChange={(value) => {
                  setSearchInput(value);
                }}
                onClear={() => {
                  setSearchInput('');
                }}
              />
            </div>
          )}
          <Button
            className="h-10 !rounded-lg"
            type="primary"
            onClick={() => setIsShowClassInformationModal(true)}
          >
            <AddIcon /> Thêm mới
          </Button>
        </div>
      </div>
      <div>
        {width < 500 && (
          <div className="w-full mt-2">
            <SearchInput
              value={searchInput}
              onChange={(value) => {
                setSearchInput(value);
              }}
              onClear={() => {
                setSearchInput('');
              }}
            />
          </div>
        )}
      </div>
      <ModalLessionForm
        open={isShowClassInformationModal}
        onClose={() => setIsShowClassInformationModal(false)}
        type={'create'}
      />
    </>
  );
};
export const LessionComponent = () => {
  return (
    <div className="my-5">
      <SectionBody className="[&_.ant-divider]:hidden" title={LessionTitle()}>
        <LessionTable />
      </SectionBody>
    </div>
  );
};
