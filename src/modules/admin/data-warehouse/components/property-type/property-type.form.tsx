'use client';

import { Button, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { PropertyTypeSchema, PropertyTypeSchemaType } from './property-type.schema';
import { convertSlugify } from '@/utilities/func.util';

type PropertyTypeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: PropertyTypeSchemaType;
};

const rule = createSchemaFieldRule(PropertyTypeSchema);

export const PropertyTypeForm = ({ open, onClose, initialValues }: PropertyTypeFormProps) => {
  const [form] = Form.useForm<PropertyTypeSchemaType>();

  const handleSubmit = async (values: PropertyTypeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} loại hình BĐS`}
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
        <Form.Item<PropertyTypeSchemaType> name="name" label="Tên:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<PropertyTypeSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
        </Form.Item>

        <Form.Item<PropertyTypeSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<PropertyTypeSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
          <Input size="large" type="number" className="h-10 dark:!bg-primary_color_d" />
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
