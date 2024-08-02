'use client';

import { SectionBody } from '@/components/common';
import { Button, Col, Form, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import { WarehouseCreateSchema, WarehouseCreateSchemaType } from './warehouse-create.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { SELECT_PROPERTY_FEATURE, SELECT_PROPERTY_TYPE } from '@/constants/data';
import { SelectAddon } from '@/components/reuse/data-entry';

const SELECT_BONUS_TYPE = [
  {
    value: 'percent',
    display_value: '%',
  },
  {
    value: 'million',
    display_value: 'Triệu',
  },
  {
    value: 'billion',
    display_value: 'Tỷ',
  },
];

const rule = createSchemaFieldRule(WarehouseCreateSchema);

export const WarehouseCreateIndex = () => {
  const [form] = Form.useForm<WarehouseCreateSchemaType>();

  const handleSubmit = async (values: WarehouseCreateSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <div className="pt-4 pr-4">
      <SectionBody title="Đăng tin">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={40}>
            {/* Left column */}
            <Col span={14}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="Nhân bản tin đăng:">
                    <Button type="primary" size="large" className="w-full">
                      Chọn tin
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="property_type"
                    label="Loại hình:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="Loại hình"
                      options={SELECT_PROPERTY_TYPE.map((option) => ({
                        label: option.name,
                        value: option.code,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="property_feature"
                    label="Đặc điểm:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      mode="multiple"
                      size="large"
                      className="w-full"
                      placeholder="Chọn đặc điểm"
                      options={SELECT_PROPERTY_FEATURE.map((option) => ({
                        label: option.name,
                        value: option.code,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="c1ty"
                    label="Thành phố:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="Chọn thành phố"
                      options={[]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="district"
                    label="Quận/Huyện:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="Chọn Quận/Huyện"
                      options={[]}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="street"
                    label="Đường phố:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="Chọn đường phố"
                      options={[]}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="house_number"
                    label="Ngõ, hẻm, số nhà, số phòng:"
                    rules={[rule]}
                    required
                  >
                    <Tooltip placement="bottomLeft" title="Ví dụ: 40.35.20.15">
                      <Input
                        size="large"
                        className="w-full h-10"
                        placeholder="Nhập ngõ, hẻm, số nhà, số phòng"
                      />
                    </Tooltip>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="project"
                    label="Dự án/Khu đô thị/Chung cư:"
                    rules={[rule]}
                    required
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="VD: Vinhomes Ocean Park"
                      options={[]}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="spec"
                    label="Thông số nhà:"
                    rules={[rule]}
                    required
                  >
                    <Input
                      size="large"
                      className="w-full h-10"
                      placeholder="Nhập thông số nhà"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<WarehouseCreateSchemaType>
                    name="bonus_value"
                    label="Hoa hồng:"
                    rules={[rule]}
                    required
                  >
                    <InputNumber
                      addonAfter={
                        <Form.Item<WarehouseCreateSchemaType>
                          name="bonus_type"
                          rules={[rule]}
                          className='m-0'
                        >
                          <SelectAddon
                            options={SELECT_BONUS_TYPE}
                            defaultValue="percent"
                            className="w-20"
                          />
                        </Form.Item>
                      }
                      type="number"
                      size="large"
                      placeholder="Nhập hoa hồng"
                      className="h-10 w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Right column */}
            <Col span={10}>2</Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large" className="w-full mt-5">
            Đăng tin
          </Button>
        </Form>
      </SectionBody>
    </div>
  );
};
