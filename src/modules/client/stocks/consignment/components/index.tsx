'use client';

import { SectionBody } from '@/components/common';
import { Col, Row, Segmented } from 'antd';
import { ConsignmentSearch } from './consignment.search';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { ConsignmentTab } from './consignment.tab';

const STOCKS_CONSIGNMENT_TABS: SegmentedOptionProps[] = [
  {
    label: 'Tin chính chủ',
    value: '1',
    component: <ConsignmentTab />,
  },
  {
    label: 'Tin nhanh',
    value: '2',
    component: <ConsignmentTab />,
  },
  {
    label: 'Tin đã lưu',
    value: '3',
    component: <ConsignmentTab />,
  },
];

export const StocksConsignmentIndex = () => {
  const { value, handleChange } = useSegmented(STOCKS_CONSIGNMENT_TABS);

  return (
    <div className="pt-4 lg:pr-4">
      <Row gutter={[18, 18]} className="relative items-start">
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 16, order: 0 }}>
          {STOCKS_CONSIGNMENT_TABS.find((option) => option.value === value)?.component}
        </Col>

        <Col xs={{ span: 24, order: 0 }} lg={{ span: 8, order: 1 }} className="sticky top-20">
          <SectionBody title="Kho tin chính chủ">
            <Segmented
              options={STOCKS_CONSIGNMENT_TABS}
              className={`no-scrollbar overflow-x-auto dark:!bg-background_d`}
              value={value}
              onChange={handleChange}
              block
            />
            <ConsignmentSearch />
          </SectionBody>
        </Col>
      </Row>
    </div>
  );
};
