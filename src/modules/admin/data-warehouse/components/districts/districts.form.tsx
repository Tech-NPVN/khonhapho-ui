'use client';

import { useEffect } from 'react';
import { DistrictsSchema, DistrictsSchemaType } from './districts.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { Button, Form, Input, Modal, Select } from 'antd';
import useFetchLocation from '@/hooks/use-fetch-location';
import { convertSlugify } from '@/utilities/func.util';

type DistrictsFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: DistrictsSchemaType;
};

const rule = createSchemaFieldRule(DistrictsSchema);

export const DistrictsForm = ({ open, onClose, initialValues }: DistrictsFormProps) => {
  const [form] = Form.useForm<DistrictsSchemaType>();

  const { cities, fetchCities } = useFetchLocation();

  const handleSubmit = async (values: DistrictsSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  useEffect(() => {
    if (cities.length === 0) fetchCities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} quận/huyện`}
      open={open}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<DistrictsSchemaType> name="name" label="Quận/huyện:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('slug', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<DistrictsSchemaType> name="city" label="Thành phố:" rules={[rule]} required>
          <Select
            size="large"
            className="w-full"
            placeholder="Chọn thành phố"
            options={cities}
            fieldNames={{ label: 'name', value: 'id' }}
            showSearch
            optionFilterProp="name"
            allowClear
          />
        </Form.Item>

        <Form.Item<DistrictsSchemaType> name="code" label="Mã:" rules={[rule]} required>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<DistrictsSchemaType> name="slug" label="Slug:" rules={[rule]} required>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
