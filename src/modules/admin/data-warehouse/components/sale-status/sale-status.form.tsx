'use client';

import { convertSlugify } from '@/utilities/func.util';
import { Button, Form, Input, Modal } from 'antd';
import { SaleStatusSchema, SaleStatusSchemaType } from './sale-status.schema';
import { createSchemaFieldRule } from 'antd-zod';

type SaleStatusFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: SaleStatusSchemaType;
};

const rule = createSchemaFieldRule(SaleStatusSchema);

export const SaleStatusForm = ({ open, onClose, initialValues }: SaleStatusFormProps) => {
  const [form] = Form.useForm<SaleStatusSchemaType>();

  const handleSubmit = async (values: SaleStatusSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} tình trạng mua bán`}
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
        <Form.Item<SaleStatusSchemaType> name="name" label="Tên:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<SaleStatusSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<SaleStatusSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<SaleStatusSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
