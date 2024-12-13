'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { ProvinceSchema, ProvinceSchemaType } from './province.schema';
import { Button, Form, Input, Modal, Select } from 'antd';
import { convertSlugify, getShortName } from '@/utilities/func.util';

type ProvinceFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: ProvinceSchemaType;
};

const rule = createSchemaFieldRule(ProvinceSchema);

export const ProvinceForm = ({ open, onClose, initialValues }: ProvinceFormProps) => {
  const [form] = Form.useForm<ProvinceSchemaType>();

  const handleSubmit = async (values: ProvinceSchemaType) => {
    console.log(values);
    // handle submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} tỉnh`}
      open={open}
      onCancel={onClose}
      onClose={onClose}
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
        <Form.Item<ProvinceSchemaType> name="name" label="Tên phòng ban:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', getShortName(e.target.value));
              form.setFieldValue('slug', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<ProvinceSchemaType> name="code" label="Mã phòng ban:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<ProvinceSchemaType> name="slug" label="Slug:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<ProvinceSchemaType> name="area" label="Khu vực:" rules={[rule]} required>
          <Select size="large" className="w-full" options={[]} showSearch allowClear />
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
