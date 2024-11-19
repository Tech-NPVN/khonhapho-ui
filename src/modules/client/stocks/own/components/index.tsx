'use client';

import { SectionBodyWithDescButton, TabLabelWithBadge } from '@/components/common';
import { AddIcon, ChangeIcon, FilterIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { Breakpoint, Routes } from '@/constants/enums';
import { Button, Input, Segmented, Select } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import OwnSearch from './own.search';
import OwnItem from './own.item';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { useRouter } from 'next-nprogress-bar';

const STOCKS_OWN_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={0} />,
    value: 'pending',
    component: <OwnItem />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2} />,
    value: 'approved',
    component: <OwnItem />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={2} />,
    value: 'rejected',
    component: <OwnItem />,
  },
  {
    label: <TabLabelWithBadge title="Thùng rác" count={2} />,
    value: 'removed',
    component: <OwnItem />,
  },
];

export const StocksOwnIndex = () => {
  const router = useRouter();
  const windows = useWindowSize();
  const { value, handleChange } = useSegmented(STOCKS_OWN_TABS);
  const tab = useSearchParams().get('tab');

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const isMobile = useMemo(() => {
    return windows.width < Breakpoint.Lg;
  }, [windows.width]);

  const renderTitleTab = useCallback(() => {
    switch (tab) {
      case null:
      case 'pending':
        return 'chờ duyệt';
      case 'approved':
        return 'đã duyệt';
      case 'rejected':
        return 'từ chối';
      case 'removed':
        return 'đã xóa';
      default:
        return '';
    }
  }, [tab]);

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

  return (
    <div className="pt-4 lg:pr-4">
      <SectionBodyWithDescButton title="Kho cá nhân" btn={renderAddButton()} className="mb-4">
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
        <div className="flex w-full justify-between gap-2">
          <Segmented
            options={STOCKS_OWN_TABS}
            className={`no-scrollbar overflow-x-auto dark:!bg-background_d ${
              isMobile ? 'w-full mb-4' : ''
            }`}
            value={value}
            onChange={handleChange}
          />
          {windows.width > Breakpoint.Lg && (
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={<SearchIcon className="w-4 h-4" />}
              className="w-[320px] border-0 shadow-btn dark:!bg-background_d rounded-xl"
            />
          )}
        </div>
        {!isMobile && <OwnSearch />}

        <div className="flex justify-between mt-1 items-center gap-2">
          <span>
            Hiện đang có <strong>20</strong> tin {renderTitleTab()}
          </span>

          <Select
            size="large"
            className="w-72"
            suffixIcon={<ChangeIcon />}
            options={SELECT_FILTER_WAREHOUSE}
            defaultValue={SELECT_FILTER_WAREHOUSE[0].value}
          />
        </div>
      </SectionBodyWithDescButton>

      {STOCKS_OWN_TABS.find((option) => option.value === value)?.component}
    </div>
  );
};
