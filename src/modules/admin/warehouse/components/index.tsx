'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { Segmented, SegmentedOptionProps } from '@/components/reuse/data-display';
import { SelectAddon } from '@/components/reuse/data-entry';
import { Button, Col, Collapse, InputNumber, Row, Select } from 'antd';
import { SELECT_PRICE_UNIT } from '@/constants/data';
import { DoubleArrowBottomIcon, ReloadDownIcon } from '@/components/icons';
import { useState } from 'react';

const ADMIN_WAREHOUSE_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={2} />,
    value: 'pending',
    component: <></>,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2001} />,
    value: 'approved',
    component: <></>,
  },
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={21352} />,
    value: 'reject',
    component: <></>,
  },
  {
    label: <TabLabelWithBadge title="Tự do" count={2} />,
    value: 'novendors',
    component: <></>,
  },
  {
    label: <TabLabelWithBadge title="Thùng rác" count={0} />,
    value: 'trash',
    component: <></>,
  },
];

export const AdminWarehouseIndex = () => {
  const [collapse, setCollapse] = useState<string | undefined>(undefined);

  return (
    <div className="pr-3 pt-5">
      <Segmented options={ADMIN_WAREHOUSE_TABS}>
        <SectionBody title="Duyệt đơn hàng" className="mt-5">
          <Row gutter={6} className="gap-y-[6px]">
            <Col span={6}>
              <Select placeholder="Hiện trạng" size="large" className="w-full" />
            </Col>
            <Col span={6}>
              <Select placeholder="Loại hình" size="large" className="w-full" />
            </Col>
            <Col span={6}>
              <Select placeholder="Tỉnh/Thành phố" size="large" className="w-full" />
            </Col>
            <Col span={6}>
              <Select placeholder="Quận/Huyện" size="large" className="w-full" disabled />
            </Col>
            <Col span={6}>
              <Select placeholder="Đường phố" size="large" className="w-full" disabled />
            </Col>
            <Col span={6}>
              <InputNumber
                addonAfter={
                  <SelectAddon
                    options={SELECT_PRICE_UNIT}
                    defaultValue="billion"
                    className="w-[70px]"
                  />
                }
                type="number"
                size="large"
                placeholder="Giá tối thiểu"
                className="h-10 w-full bg-transparent"
              />
            </Col>
            <Col span={6}>
              <InputNumber
                addonAfter={
                  <SelectAddon
                    options={SELECT_PRICE_UNIT}
                    defaultValue="billion"
                    className="w-[70px]"
                  />
                }
                type="number"
                size="large"
                placeholder="Giá tối đa"
                className="h-10 w-full bg-transparent"
              />
            </Col>
            <Col span={6}>
              <Select placeholder="Khoảng giá" size="large" className="w-full" />
            </Col>
            <Col span={24}>
              <Collapse
                className="[&>div]:flex [&>div]:flex-col-reverse p-0"
                expandIcon={({ isActive }) => (
                  <DoubleArrowBottomIcon className={`${isActive ? 'rotate-180' : ''}`} />
                )}
                defaultActiveKey={collapse ? [collapse] : undefined}
                expandIconPosition="right"
                onChange={(key) => {
                  if (key.length > 0) {
                    setCollapse(undefined);
                  } else {
                    setCollapse('collapsed');
                  }
                }}
                ghost
                items={[
                  {
                    key: 'collapsed',
                    label: (
                      <div className="relative mr-5">
                        <span className="absolute flex h-3 w-3 -top-1 -right-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color_l opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-color_l"></span>
                        </span>
                        <span>{!collapse ? 'Thu nhỏ' : 'Mở rộng'}</span>
                      </div>
                    ),
                    style: {
                      textAlign: 'right',
                    },
                    children: (
                      <Row gutter={6}>
                        <Col span={6}>
                          <Select placeholder="Đặc điểm BĐS" size="large" className="w-full text-left" />
                        </Col>
                        <Col span={6}>
                          <Button
                            icon={<ReloadDownIcon />}
                            size="large"
                            className="w-full bg-transparent dark:border-divider_d dark:text-primary_text_d rounded-xl"
                          >
                            Đặt lại
                          </Button>
                        </Col>
                      </Row>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>

          <div className='flex'>

          </div>
        </SectionBody>
      </Segmented>
    </div>
  );
};
