'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import WarehouseSearch from './warehouse.search';
import { WarehouseTable } from './warehouse.table';

const WAREHOUSE_TABS: SegmentedOptionProps[] = [
  {
    label: 'Danh sách',
    value: 'list',
    component: <></>,
  },
  {
    label: 'Chi tiết',
    value: 'details',
    component: <></>,
  },
  {
    label: 'Đã lưu',
    value: 'saved',
    component: <></>,
  },
];

export const WarehouseIndex = () => {
  const router = useRouter();

  return (
    <div className="pt-4 pr-4">
      <SectionBodyWithDescButton
        title="Kho tài nguyên"
        description={<span className="text-link">Lý do không lọc Diện tích/Mặt tiền/Hướng </span>}
        btn={
          <Button icon={<AddIcon className="mr-1" />} type="primary" size="large" className="px-5">
            Đăng tin
          </Button>
        }
      >
        <SegmentedWithNode
          options={WAREHOUSE_TABS}
          className="dark:!bg-background_d"
          element={
            <Input
              size="large"
              placeholder="Nhập đc, SĐT, seri sổ"
              prefix={<SearchIcon className="w-4 h-4" />}
              className="w-[320px] border-0 shadow-btn dark:bg-background_d rounded-xl"
            />
          }
        >
          <WarehouseSearch />
          <WarehouseTable />
        </SegmentedWithNode>
      </SectionBodyWithDescButton>
    </div>
  );
};
