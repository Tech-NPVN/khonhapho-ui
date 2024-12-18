'use client';

import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Select, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { ConsignmentSchema, ConsignmentSchemaType } from './consignment-form.schema';
import { DEMO_PROPERTY_TYPE } from '../consignment.const';
import useFetchLocation from '@/hooks/use-fetch-location';
import { useEffect } from 'react';
import { CityType, DistrictType } from '@/apis/location';

type ConsignmentFormModalProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: ConsignmentSchemaType;
};

const rule = createSchemaFieldRule(ConsignmentSchema);

export const ConsignmentFormModal = ({
  open,
  onClose,
  initialValues,
}: ConsignmentFormModalProps) => {
  const [form] = Form.useForm<ConsignmentSchemaType>();

  const cityWatcher = Form.useWatch('city', form);
  const priceTypeWatcher = Form.useWatch('price_type', form);

  const handleSubmit = async (values: ConsignmentSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  const { cities, districts, fetchCities, fetchDistricts, setDistricts } = useFetchLocation();

  useEffect(() => {
    if (cities.length === 0) fetchCities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialValues?.district) {
      fetchDistricts(initialValues.city);
    }
  }, [fetchDistricts, initialValues]);

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Tạo'} tin chính chủ`}
      open={open}
      onCancel={onClose}
      onClose={onClose}
      width={600}
      footer={null}
      centered
    >
      <Form
        form={form}
        initialValues={
          initialValues ?? {
            type: 1,
          }
        }
        onFinish={handleSubmit}
        layout="vertical"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<ConsignmentSchemaType> name="type" required rules={[rule]}>
          <Radio.Group>
            <Space direction="horizontal">
              {[
                {
                  label: 'Chính chủ',
                  value: 1,
                },
                {
                  label: 'Tin nhanh',
                  value: 2,
                },
              ].map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Row gutter={12}>
          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType>
              name="property_type"
              label="Loại hình nhà đất:"
              rules={[rule]}
              required
            >
              <Select
                size="large"
                className="w-full"
                placeholder="Loại hình nhà đất"
                options={DEMO_PROPERTY_TYPE}
                fieldNames={{ label: 'name', value: 'code' }}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType>
              name="city"
              label="Thành phố:"
              rules={[rule]}
              required
            >
              <Select
                size="large"
                className="w-full"
                placeholder="Chọn thành phố"
                options={cities}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp="name"
                onChange={(value: number, fullValues) => {
                  if (value) {
                    fetchDistricts(value);
                  } else {
                    setDistricts([]);
                  }
                  form.setFieldsValue({
                    address: (fullValues as CityType)?.name,
                    district: undefined,
                  });
                }}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType> name="district" label="Quận/Huyện:" rules={[rule]}>
              <Select
                size="large"
                className="w-full"
                placeholder="Chọn Quận/Huyện"
                options={districts}
                fieldNames={{ label: 'name', value: 'id' }}
                showSearch
                optionFilterProp="name"
                disabled={districts.length === 0}
                onChange={(value: number, fullValues) => {
                  const valueName = (fullValues as DistrictType)?.name;
                  const matchingCity = cities.find((c) => c.id === cityWatcher);

                  if (valueName && matchingCity) {
                    form.setFieldsValue({ address: [matchingCity.name, valueName].join(', ') });
                  }
                }}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<ConsignmentSchemaType> name="address" label="Địa chỉ:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Nhập địa chỉ"
          />
        </Form.Item>

        <Row gutter={12}>
          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType>
              name="owner_phone"
              label="Số điện thoại chủ nhà:"
              required
              rules={[rule]}
            >
              <Input
                size="large"
                className="h-10 dark:!bg-primary_color_d"
                placeholder="Nhập số điện thoại"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType> name="price" label="Giá:" required rules={[rule]}>
              <Input
                size="large"
                className="h-10 dark:!bg-primary_color_d"
                placeholder="Nhập giá"
                type="number"
                disabled={priceTypeWatcher}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item<ConsignmentSchemaType>
              name="area"
              label="Diện tích:"
              required
              rules={[rule]}
            >
              <Input
                size="large"
                className="h-10 dark:!bg-primary_color_d"
                placeholder="Nhập diện tích"
                type="number"
                addonAfter="m²"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<ConsignmentSchemaType> name="price_type" rules={[rule]}>
          <Checkbox
            onChange={(e) => {
              const isChecked = e.target.checked;
              if (isChecked) {
                form.setFieldsValue({ price: 0 });
              }
              form.setFieldsValue({ price_type: isChecked });
            }}
          >
            Giá thoả thuận
          </Checkbox>
        </Form.Item>

        <Form.Item<ConsignmentSchemaType> name="title" label="Tiêu đề:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Nhập tiêu đề"
          />
        </Form.Item>

        <Form.Item<ConsignmentSchemaType> name="content" label="Nội dung:" required rules={[rule]}>
          <Input.TextArea
            size="large"
            className="dark:!bg-primary_color_d"
            placeholder="Nhập nội dung"
            rows={4}
            maxLength={3000}
            showCount
          />
        </Form.Item>

        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="lg:min-w-40 xs:min-w-full"
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
