'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { StreetsSchema, StreetsSchemaType } from './streets.schema';
import { Button, Form, Input, Modal, Select } from 'antd';
import useFetchLocation from '@/hooks/use-fetch-location';
import { useEffect } from 'react';
import { convertSlugify, getShortName } from '@/utilities/func.util';

type StreetsFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: StreetsSchemaType;
};

const rule = createSchemaFieldRule(StreetsSchema);

export const StreetsForm = ({ open, onClose, initialValues }: StreetsFormProps) => {
  const [form] = Form.useForm<StreetsSchemaType>();

  const { cities, districts, fetchCities, fetchDistricts, setDistricts } = useFetchLocation();

  const handleSubmit = async (values: StreetsSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  useEffect(() => {
    if (cities.length === 0) fetchCities();
    if (initialValues?.city && initialValues?.district) {
      fetchDistricts(initialValues.city);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} đường`}
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
        <Form.Item<StreetsSchemaType> name="city" label="Thành phố:" rules={[rule]} required>
          <Select
            size="large"
            className="w-full"
            placeholder="Chọn thành phố"
            options={cities}
            fieldNames={{ label: 'name', value: 'id' }}
            showSearch
            optionFilterProp="name"
            onChange={(value: number) => {
              if (value) {
                fetchDistricts(value);
              } else {
                setDistricts([]);
              }
              form.setFieldsValue({
                district: undefined,
              });
            }}
            allowClear
          />
        </Form.Item>

        <Form.Item<StreetsSchemaType> name="district" label="Quận/Huyện:" rules={[rule]} required>
          <Select
            size="large"
            className="w-full"
            placeholder="Chọn Quận/Huyện"
            options={districts}
            fieldNames={{ label: 'name', value: 'id' }}
            showSearch
            optionFilterProp="name"
            disabled={districts.length === 0}
            allowClear
          />
        </Form.Item>

        <Form.Item<StreetsSchemaType> name="name" label="Tên:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', getShortName(e.target.value));
              form.setFieldValue('slug', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<StreetsSchemaType> name="code" label="Mã:" rules={[rule]} required>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<StreetsSchemaType> name="slug" label="Slug:" rules={[rule]} required>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
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
