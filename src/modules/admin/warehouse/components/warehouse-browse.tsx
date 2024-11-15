'use client';

import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { WarehouseBrowseItem } from './warehouse-browse.item';
import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import { Breakpoint } from '@/constants/enums';
import { WarehouseBrowseSearch, WarehouseBrowseSearchModal } from './warehouse-browse.search';
import { Button, Input, Segmented, Select } from 'antd';
import { ChangeIcon, FilterIcon, SearchIcon } from '@/components/icons';
import { SELECT_FILTER_WAREHOUSE } from '@/constants/data';
import { useSearchParams } from 'next/navigation';

const ADMIN_WAREHOUSE_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={2} />,
    value: 'pending',
    component: (
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <WarehouseBrowseItem key={i} />
        ))}
      </div>
    ),
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2001} />,
    value: 'approved',
    component: (
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <WarehouseBrowseItem key={i} />
        ))}
      </div>
    ),
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={21352} />,
    value: 'rejected',
    component: (
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <WarehouseBrowseItem key={i} />
        ))}
      </div>
    ),
  },
  {
    label: <TabLabelWithBadge title="Tự do" count={2} />,
    value: 'novendors',
    component: (
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <WarehouseBrowseItem key={i} />
        ))}
      </div>
    ),
  },
  {
    label: <TabLabelWithBadge title="Thùng rác" count={0} />,
    value: 'trash',
    component: (
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <WarehouseBrowseItem key={i} />
        ))}
      </div>
    ),
  },
];

export const AdminWarehouseIndex = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const windows = useWindowSize();
  const tab = useSearchParams().get('tab');
  const { value, handleChange } = useSegmented(ADMIN_WAREHOUSE_TABS);
  
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
      case 'novendors':
        return 'tự do';
      case 'trash':
        return 'đã xóa';
      default:
        return '';
    }
  }, [tab]);

  return (
    <>
      <div className="pt-4 lg:pr-3">
        <SectionBody title="Duyệt kho hàng">
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
              options={ADMIN_WAREHOUSE_TABS}
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

          {!isMobile && <WarehouseBrowseSearch />}

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
        </SectionBody>

        {ADMIN_WAREHOUSE_TABS.find((option) => option.value === value)?.component}
      </div>

      <WarehouseBrowseSearchModal open={openFilter} onCancel={() => setOpenFilter(false)} />
    </>
  );
};
