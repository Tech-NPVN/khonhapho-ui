'use client';

import { SectionBodyWithDesc } from '@/components/common';
import { FilterIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { Breakpoint } from '@/constants/enums';
import WarehouseSearch from '@/modules/client/warehouse/components/warehouse.search';
import { Button, Input, Segmented } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from 'react-use';
import { NovendorsTable } from './novendors.table';
import { NovendorsDetails } from './novendors.details';
import { ModalFilterWarehouse } from '@/common/modal';

const STOCKS_NOVENDOR_TABS: SegmentedOptionProps[] = [
  {
    label: 'Danh sách',
    value: 'list',
    component: <NovendorsTable />,
  },
  {
    label: 'Chi tiết',
    value: 'details',
    component: <NovendorsDetails />,
  },
];

export const StocksNovendorsIndex = () => {
  const windows = useWindowSize();
  const { value, handleChange } = useSegmented(STOCKS_NOVENDOR_TABS);
  const tab = useSearchParams().get('tab');

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const renderDescription = useCallback(() => {
    return (
      <p className="mb-0">
        {' '}
        <span className="text-error_l dark:text-error-d">Lưu ý:</span> Tự động xóa sau 7 ngày
      </p>
    );
  }, []);

  const isMobile = useMemo(() => {
    return windows.width < Breakpoint.Lg;
  }, [windows.width]);

  const isDetailsTab = useMemo(() => {
    return tab === 'details';
  }, [tab]);

  return (
    <>
      <div className="pt-4 lg:pr-4">
        <SectionBodyWithDesc title="Kho hàng tự do" description={renderDescription()}>
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
              options={STOCKS_NOVENDOR_TABS}
              className="dark:!bg-background_d max-lg:w-full"
              block={isMobile}
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

          {!isMobile && <WarehouseSearch />}

          {!isDetailsTab &&
            STOCKS_NOVENDOR_TABS.find((option) => option.value !== 'details')?.component}
        </SectionBodyWithDesc>

        {isDetailsTab &&
          STOCKS_NOVENDOR_TABS.find((option) => option.value === 'details')?.component}
      </div>

      <ModalFilterWarehouse open={openFilter} handleCancel={() => setOpenFilter(false)} />
    </>
  );
};
