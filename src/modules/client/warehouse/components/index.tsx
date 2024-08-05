'use client';

import { LinkIcon, SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Button, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import WarehouseSearch from './warehouse.search';
import { Routes } from '@/constants/enums';
import { useCallback, useMemo, useState } from 'react';
import {
  WarehouseTabsDetails,
  WarehouseTabsDetailsFilter,
  WarehouseTabsList,
  WarehouseTabsSaved,
} from './warehouse-tabs';
import { ModalReasonDecs } from '@/common/modal';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  const tab = useSearchParams().get('tab');

  const isDetailsTab = useMemo(() => {
    return tab === 'details';
  }, [tab]);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        size="large"
        className="px-5"
        onClick={() => router.push(Routes.WarehouseCreate)}
      >
        Đăng tin
      </Button>
    );
  }, [router]);

  return (
    <>
      <div className="pt-4 pr-4">
        <SectionBodyWithDescButton
          title="Kho tài nguyên"
          description={
            <button className="text-link bg-transparent border-0 p-0" onClick={() => setShowModal(true)}>
              Lý do không lọc Diện tích/Mặt tiền/Hướng <LinkIcon />
            </button>
          }
          btn={renderAddButton()}
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
          </SegmentedWithNode>
        </SectionBodyWithDescButton>

        {isDetailsTab && <WarehouseTabsDetails />}
      </div>

      <ModalReasonDecs open={showModal} handleCancel={() => setShowModal(false)} />
    </>
  );
};
