'use client';

import { Button, Form, Input, Modal } from 'antd';
import { LegalStatusSchemaType, LegalStatusSchema } from './legal-status.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { convertSlugify } from '@/utilities/func.util';

type LegalStatusFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: LegalStatusSchemaType;
};

const rule = createSchemaFieldRule(LegalStatusSchema);

export const LegalStatusForm = ({ open, onClose, initialValues }: LegalStatusFormProps) => {
  const [form] = Form.useForm<LegalStatusSchemaType>();

  const handleSubmit = async (values: LegalStatusSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} tình trạng pháp lý`}
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
        <Form.Item<LegalStatusSchemaType> name="name" label="Tên pháp lý:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<LegalStatusSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<LegalStatusSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<LegalStatusSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
