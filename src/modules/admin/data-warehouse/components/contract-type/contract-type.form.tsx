'use client';

import { convertSlugify } from '@/utilities/func.util';
import { Button, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { ContractTypeSchema, ContractTypeSchemaType } from './contract-type.schema';

type ContracTypeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: ContractTypeSchemaType;
};

const rule = createSchemaFieldRule(ContractTypeSchema);

export const ContractTypeForm = ({ open, onClose, initialValues }: ContracTypeFormProps) => {
  const [form] = Form.useForm<ContractTypeSchemaType>();

  const handleSubmit = async (values: ContractTypeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} loại hợp đồng`}
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
        <Form.Item<ContractTypeSchemaType>
          name="name"
          label="Loại hợp đồng:"
          required
          rules={[rule]}
        >
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<ContractTypeSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
        </Form.Item>

        <Form.Item<ContractTypeSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<ContractTypeSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
