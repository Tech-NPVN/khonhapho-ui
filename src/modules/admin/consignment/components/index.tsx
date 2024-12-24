'use client';

import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { ConsignmentList } from './consignment.list';
import { SectionBodyWithDescButton } from '@/components/common';
import { Button, Col, Input, Row, Segmented } from 'antd';
import { useCallback, useState } from 'react';
import { AddIcon, SearchIcon } from '@/components/icons';
import { ConsignmentFormModal } from './consignment-form.modal';

const CONSIGNMENT_TABS: SegmentedOptionProps[] = [
  {
    label: 'Tin chính chủ',
    value: '1',
    component: <ConsignmentList />,
  },
  {
    label: 'Tin nhanh',
    value: '2',
    component: <ConsignmentList />,
  },
];

export const ConsignmentIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { value, handleChange } = useSegmented(CONSIGNMENT_TABS);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon />}
        type="primary"
        className="px-3 max-lg:text-[13px]"
        onClick={() => setOpenCreate(true)}
      >
        Tạo tin
      </Button>
    );
  }, []);

  return (
    <>
      <div className="pt-4 lg:pr-4">
        <Row gutter={[18, 18]} className="relative items-start">
          <Col xs={{ span: 24, order: 1 }} lg={{ span: 16, order: 0 }}>
            {CONSIGNMENT_TABS.find((option) => option.value === value)?.component}
          </Col>

          <Col xs={{ span: 24, order: 0 }} lg={{ span: 8, order: 1 }} className="sticky top-20">
            <SectionBodyWithDescButton title="Quản lý tin chính chủ" btn={renderAddButton()}>
              <Segmented
                options={CONSIGNMENT_TABS}
                className={`no-scrollbar overflow-x-auto dark:!bg-background_d`}
                value={value}
                onChange={handleChange}
                block
              />

              <Input
                size="large"
                placeholder="Nhập nội dung tìm kiếm"
                suffix={<SearchIcon className="w-4 h-4" />}
                className="w-full mt-5"
              />
            </SectionBodyWithDescButton>
          </Col>
        </Row>
      </div>

      <ConsignmentFormModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
