'use client';

import { LinkIcon, SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Breakpoint } from '@/constants/enums';
import { Button, Input } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import CustomersSearch from './customers.search';
import { ModalCustCreate, ModalCustQuestion } from './modal';

const USER_CUSTOMER_TABS: SegmentedOptionProps[] = [
  {
    label: 'Đang tìm mua',
    value: 'buying',
    component: <></>,
  },
  {
    label: 'Đã mua nhà',
    value: 'bought',
    component: <></>,
  },
];

export const UserCustomersIndex = () => {
  const windows = useWindowSize();

  // Modal state
  const [openCustomerQuestion, setOpenCustomerQuestion] = useState<boolean>(false);
  const [openAddNew, setOpenAddNew] = useState<boolean>(false);

  const isMobile = useMemo(() => {
    return windows.width < Breakpoint.Lg;
  }, [windows.width]);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        size="large"
        className="px-5 max-lg:text-[13px]"
        onClick={() => setOpenAddNew(true)}
      >
        Thêm mới
      </Button>
    );
  }, []);

  const renderDescButton = useCallback(() => {
    return (
      <button
        className="text-link bg-transparent border-0 p-0 max-lg:text-xs text-left"
        onClick={() => setOpenCustomerQuestion(true)}
      >
        18 Câu truy vấn khách hàng <LinkIcon />
      </button>
    );
  }, []);
  return (
    <>
      <div className="pt-4 lg:pr-4">
        <SectionBodyWithDescButton
          title="Quản lý khách hàng"
          description={renderDescButton()}
          btn={renderAddButton()}
        >
          <SegmentedWithNode
            options={USER_CUSTOMER_TABS}
            className={`dark:!bg-background_d ${isMobile ? 'w-full mb-4' : ''}`}
            block={isMobile}
            element={
              windows.width > Breakpoint.Lg && (
                <Input
                  size="large"
                  placeholder="Nhập nội dung tìm kiếm"
                  prefix={<SearchIcon className="w-4 h-4" />}
                  className="w-[320px] border-0 shadow-btn dark:!bg-background_d rounded-xl"
                />
              )
            }
          >
            {!isMobile && <CustomersSearch />}
          </SegmentedWithNode>
        </SectionBodyWithDescButton>
      </div>

      <ModalCustQuestion
        open={openCustomerQuestion}
        handleCancel={() => setOpenCustomerQuestion(false)}
      />

      <ModalCustCreate open={openAddNew} handleCancel={() => setOpenAddNew(false)} />
    </>
  );
};
