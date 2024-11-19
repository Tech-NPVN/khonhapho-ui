'use client';

import { LinkIcon, SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, FilterIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Button, Input } from 'antd';
import { useSearchParams } from 'next/navigation';
import WarehouseSearch from './warehouse.search';
import { Breakpoint, Routes } from '@/constants/enums';
import { useCallback, useMemo, useState } from 'react';
import {
  WarehouseTabsDetails,
  WarehouseTabsDetailsFilter,
  WarehouseTabsList,
  WarehouseTabsSaved,
} from './warehouse-tabs';
import { ModalFilterWarehouse, ModalReasonDecs } from '@/common/modal';
import { useWindowSize } from 'react-use';
import { ModalAddCollection, ModalColCreateUpdate } from '../../user/collection';
import { useRouter } from 'next-nprogress-bar';

const WAREHOUSE_TABS: SegmentedOptionProps[] = [
  {
    label: 'Danh sách',
    value: 'list',
    component: <WarehouseTabsList />,
  },
  {
    label: 'Chi tiết',
    value: 'details',
    component: <WarehouseTabsDetailsFilter />,
  },
  {
    label: 'Đã lưu',
    value: 'saved',
    component: <WarehouseTabsSaved />,
  },
];

export const WarehouseIndex = () => {
  const router = useRouter();
  const windows = useWindowSize();
  const tab = useSearchParams().get('tab');

  // Modal state
  const [openReasonDecs, setOpenReasonDecs] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const isDetailsTab = useMemo(() => {
    return tab === 'details';
  }, [tab]);

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
        onClick={() => router.push(Routes.WarehouseCreate)}
      >
        Đăng tin
      </Button>
    );
  }, [router]);

  const renderDescButton = useCallback(() => {
    return (
      <button
        className="text-link bg-transparent border-0 p-0 max-lg:text-xs text-left"
        onClick={() => setOpenReasonDecs(true)}
      >
        Lý do không lọc Diện tích/Mặt tiền/Hướng <LinkIcon />
      </button>
    );
  }, []);

  return (
    <>
      <div className="pt-4 lg:pr-4">
        <SectionBodyWithDescButton
          title="Kho tài nguyên"
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
                placeholder="Nhập đc, SĐT, seri sổ"
                prefix={<SearchIcon className="w-4 h-4" />}
                className="w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
              />
            </div>
          )}

          <SegmentedWithNode
            options={WAREHOUSE_TABS}
            className={`dark:!bg-background_d ${isMobile ? 'w-full mb-4' : ''}`}
            block={isMobile}
            element={
              windows.width > Breakpoint.Lg && (
                <Input
                  size="large"
                  placeholder="Nhập đc, SĐT, seri sổ"
                  prefix={<SearchIcon className="w-4 h-4" />}
                  className="w-[320px] border-0 shadow-btn dark:!bg-background_d rounded-xl"
                />
              )
            }
          >
            {!isMobile && <WarehouseSearch />}
          </SegmentedWithNode>
        </SectionBodyWithDescButton>

        {isDetailsTab && <WarehouseTabsDetails />}
      </div>

      <ModalReasonDecs open={openReasonDecs} handleCancel={() => setOpenReasonDecs(false)} />
      <ModalFilterWarehouse open={openFilter} handleCancel={() => setOpenFilter(false)} />
    </>
  );
};
