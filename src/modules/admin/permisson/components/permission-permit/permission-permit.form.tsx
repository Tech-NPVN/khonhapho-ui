'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { PermissionPermitSchema, PermissionPermitSchemaType } from './permission-permit.schema';
import { Button, Form, Input, Modal, Select } from 'antd';
import { convertSlugify } from '@/utilities/func.util';

type PermissionTypeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: PermissionPermitSchemaType;
};

const rule = createSchemaFieldRule(PermissionPermitSchema);

export const PermissionPermitForm = ({ open, onClose, initialValues }: PermissionTypeFormProps) => {
  const [form] = Form.useForm<PermissionPermitSchemaType>();

  const handleSubmit = async (values: PermissionPermitSchemaType) => {
    console.log(values);
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} quyền`}
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
        <Form.Item<PermissionPermitSchemaType>
          name="name"
          label="Tên quyền:"
          required
          rules={[rule]}
        >
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value, '_'));
            }}
            placeholder="Nhập tên quyền"
          />
        </Form.Item>

        <Form.Item<PermissionPermitSchemaType> name="code" label="Code:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Mã code, viết liền không dấu"
          />
        </Form.Item>

        <Form.Item<PermissionPermitSchemaType>
          name="permission_type"
          label="Loại quyền:"
          required
          rules={[rule]}
        >
          <Select
            size="large"
            className="w-full"
            options={[
              {
                name: 'Cập nhật tài khoản',
                code: 'cap-nhat-tai-khoan',
              },
            ]}
            fieldNames={{ label: 'name', value: 'code' }}
            showSearch
            allowClear
            placeholder="Chọn loại quyền"
          />
        </Form.Item>

        <Form.Item<PermissionPermitSchemaType> name="order" label="Thứ tự:" required rules={[rule]}>
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
