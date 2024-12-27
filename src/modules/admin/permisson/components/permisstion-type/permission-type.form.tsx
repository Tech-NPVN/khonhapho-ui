'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { PermissionTypeSchema, PermissionTypeSchemaType } from './permission-type.schema';
import { Button, Form, Input, Modal } from 'antd';

type PermissionTypeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: PermissionTypeSchemaType;
};

const rule = createSchemaFieldRule(PermissionTypeSchema);

export const PermissionTypeForm = ({ open, onClose, initialValues }: PermissionTypeFormProps) => {
  const [form] = Form.useForm<PermissionTypeSchemaType>();

  const handleSubmit = async (values: PermissionTypeSchemaType) => {
    console.log(values);
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} loại quyền`}
      open={open}
      onCancel={onClose}
      onClose={onClose}
      width={600}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={initialValues ?? {}}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<PermissionTypeSchemaType>
          name="name"
          label="Tên loại quyền:"
          required
          rules={[rule]}
        >
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Nhập loại quyền"
          />
        </Form.Item>

        <Form.Item<PermissionTypeSchemaType> name="order" label="Thứ tự:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            type="number"
            placeholder="Nhập thứ tự"
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit" className="px-6">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
