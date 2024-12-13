'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { PriceRangeSchema, PriceRangeSchemaType } from './price-range.schema';
import { Button, Form, Input, Modal } from 'antd';
import { convertSlugify } from '@/utilities/func.util';

type PriceRangeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: PriceRangeSchemaType;
};

const rule = createSchemaFieldRule(PriceRangeSchema);

export const PriceRangeForm = ({ open, onClose, initialValues }: PriceRangeFormProps) => {
  const [form] = Form.useForm<PriceRangeSchemaType>();

  const handleSubmit = async (values: PriceRangeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} khoảng giá`}
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
        <Form.Item<PriceRangeSchemaType> name="name" label="Khoảng giá:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<PriceRangeSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<PriceRangeSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<PriceRangeSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
