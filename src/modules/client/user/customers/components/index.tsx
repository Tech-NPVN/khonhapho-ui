'use client';

import { LinkIcon, SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, FilterIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Breakpoint } from '@/constants/enums';
import { Button, Checkbox, Input } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import CustomersSearch, { ModalCustomersSearch, optionsCheckbox } from './customers.search';
import { ModalCustCreateUpdate, ModalCustQuestion } from './modal';
import CustomersTable from './customers.table';

const USER_CUSTOMER_TABS: SegmentedOptionProps[] = [
  {
    label: 'Đang tìm mua',
    value: 'buying',
    component: <CustomersTable type="buying" />,
  },
  {
    label: 'Đã mua nhà',
    value: 'bought',
    component: <CustomersTable type="bought" />,
  },
];

export const UserCustomersIndex = () => {
  const windows = useWindowSize();

  // Modal state
  const [openCustomerQuestion, setOpenCustomerQuestion] = useState<boolean>(false);
  const [openAddNew, setOpenAddNew] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

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
          {isMobile && (
            <div className="flex justify-between gap-5 mb-4">
              <Button
                icon={<FilterIcon />}
                type="text"
                size="large"
                className="shadow-btn rounded-xl dark:bg-background_d"
                onClick={() => setOpenFilter(true)}
              >
                Lọc
              </Button>
              <Input
                size="large"
                placeholder="Nhập nội dung tìm kiếm"
                prefix={<SearchIcon className="w-4 h-4" />}
                className="w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
              />
            </div>
          )}

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
            {isMobile && (
              <Checkbox.Group
                options={optionsCheckbox}
                className="overflow-x-auto flex-nowrap [&>label]:py-2 [&>label]:px-2 [&>label]:rounded-lg [&>label]:bg-background_l_2 dark:[&>label]:bg-background_d [&>label]:text-[13px] [&>label]:flex-shrink-0 no-scrollbar"
              />
            )}
            {!isMobile && <CustomersSearch />}
          </SegmentedWithNode>
        </SectionBodyWithDescButton>
      </div>

      <ModalCustQuestion
        open={openCustomerQuestion}
        handleCancel={() => setOpenCustomerQuestion(false)}
      />

      <ModalCustCreateUpdate open={openAddNew} handleCancel={() => setOpenAddNew(false)} />

      <ModalCustomersSearch open={openFilter} handleCancel={() => setOpenFilter(false)}/>
    </>
  );
};
