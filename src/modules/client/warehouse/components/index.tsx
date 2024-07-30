'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, SearchIcon } from '@/components/icons';
import { SegmentedOptionProps, SegmentedWithNode } from '@/components/reuse/data-display';
import { Button, Divider, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import WarehouseSearch from './warehouse.search';
import { WarehouseTable } from './warehouse.table';
import { Routes } from '@/constants/enums';
import { useCallback, useState } from 'react';
import { WAREHOUSE_REASON_CONTENT_SAMPLE } from '@/constants/data';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

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
            <span className="text-link" onClick={() => setShowModal(true)}>
              Lý do không lọc Diện tích/Mặt tiền/Hướng
            </span>
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
            <WarehouseTable />
          </SegmentedWithNode>
        </SectionBodyWithDescButton>
      </div>

      <ModalReason open={showModal} handleCancel={() => setShowModal(false)} />
    </>
  );
};

const ModalReason = ({ open, handleCancel }: { open: boolean; handleCancel: () => void }) => {
  return (
    <Modal
      title="Lý do không lọc Diện tích/Mặt tiền/Hướng"
      open={open}
      onCancel={handleCancel}
      width={650}
      footer={null}
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <div
        dangerouslySetInnerHTML={{ __html: WAREHOUSE_REASON_CONTENT_SAMPLE }}
        style={{ fontSize: '15px' }}
      ></div>
    </Modal>
  );
};
