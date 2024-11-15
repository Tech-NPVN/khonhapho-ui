'use client';

import { DoubleArrowBottomIcon, FilterIcon, ReloadDownIcon } from '@/components/icons';
import { SelectAddon } from '@/components/reuse/data-entry';
import {
  SELECT_PRICE_UNIT,
  SELECT_PROPERTY_FEATURE,
  SELECT_PROPERTY_TYPE,
  SELECT_WAREHOUSE_STATUS,
} from '@/constants/data';
import { Button, Col, Collapse, Divider, Flex, InputNumber, Modal, Row, Select } from 'antd';
import { useCallback, useState } from 'react';

export const WarehouseBrowseSearch = () => {
  const [expand, setExpand] = useState<string[]>([]);

  const renderExpanding = useCallback(() => {
    return (
      <Row gutter={[6, 6]}>
        <Col span={6}>
          <Select
            placeholder="Đặc điểm BĐS"
            size="large"
            className="w-full"
            options={SELECT_PROPERTY_FEATURE}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Col>
        <Col span={6}>
          <Button
            icon={<ReloadDownIcon />}
            size="large"
            className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d"
          >
            Đặt lại
          </Button>
        </Col>
      </Row>
    );
  }, []);

  return (
    <Row gutter={[6, 6]} className="mt-5">
      <Col span={6}>
        <Select
          placeholder="Hiện trạng"
          size="large"
          className="w-full"
          options={SELECT_WAREHOUSE_STATUS}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Loại hình"
          size="large"
          className="w-full"
          options={[{ name: 'Tất cả', code: 'tat-ca' }, ...SELECT_PROPERTY_TYPE]}
          fieldNames={{ label: 'name', value: 'code' }}
        />
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
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
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
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
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
          defaultActiveKey={expand}
          ghost
          onChange={(key) => (key.includes('1') ? setExpand(['1']) : setExpand([]))}
          items={[
            {
              key: '1',
              showArrow: false,
              className: 'text-right',
              label: (
                <div className="relative">
                  <Button
                    icon={
                      <DoubleArrowBottomIcon
                        className={`${expand.includes('1') ? 'rotate-180' : ''}`}
                      />
                    }
                    type="text"
                    className="dark:bg-background_d py-5"
                  >
                    <span className="absolute flex h-2 w-2 top-0 right-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color_l opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-color_l"></span>
                    </span>
                    {expand.includes('1') ? 'Thu nhỏ' : 'Mở rộng'}
                  </Button>
                </div>
              ),
              children: renderExpanding(),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export const WarehouseBrowseSearchModal = ({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) => {
  return (
    <Modal title="Bộ lọc" open={open} onCancel={onCancel} width={500} footer={null} centered>
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Flex vertical gap={16}>
        <Select placeholder="Hiện trạng" className="w-full" />
        <Select placeholder="Loại hình" className="w-full" />
        <Select placeholder="Tỉnh/Thành phố" className="w-full" />
        <Select placeholder="Quận/Huyện" className="w-full" disabled />
        <Select placeholder="Đường phố" className="w-full" disabled />

        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
        
          placeholder="Giá tối thiểu"
          className="w-full bg-transparent"
        />

        <InputNumber
          addonAfter={
            <SelectAddon options={SELECT_PRICE_UNIT} defaultValue="billion" className="w-[70px]" />
          }
          type="number"
          placeholder="Giá tối đa"
          className="w-full bg-transparent"
        />

        <Select placeholder="Khoảng giá" className="w-full" />
        <Select placeholder="Đặc điểm BĐS" className="w-full" />

        <Button
          block
          type="primary"
          icon={<FilterIcon className="[&>path]:stroke-primary_color_l" />}
          className="mt-5 py-4"
        >
          Lọc
        </Button>

        <Button block type="default" icon={<ReloadDownIcon />} className="py-4">
          Đặt lại
        </Button>
      </Flex>
    </Modal>
  );
};

