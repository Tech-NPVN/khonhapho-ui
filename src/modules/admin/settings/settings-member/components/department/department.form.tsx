'use client';

import { Button, Form, Input, Modal, Select } from 'antd';
import { DepartmentSchema, DepartmentSchemaType } from './department.schema';
import { convertSlugify } from '@/utilities/func.util';
import { createSchemaFieldRule } from 'antd-zod';

type DepartmentFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: DepartmentSchemaType;
};

const rule = createSchemaFieldRule(DepartmentSchema);

export const DepartmentForm = ({ open, onClose, initialValues }: DepartmentFormProps) => {
  const [form] = Form.useForm<DepartmentSchemaType>();

  const handleSubmit = async (values: DepartmentSchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} phòng ban`}
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
        <Form.Item<DepartmentSchemaType> name="name" label="Tên phòng ban:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<DepartmentSchemaType> name="branch" label="Chi nhánh:" rules={[rule]} required>
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
