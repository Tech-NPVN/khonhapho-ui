'use client';

import { Button, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { CitiesSchema, CitiesSchemaType } from './cities.schema';
import { convertSlugify, getShortName } from '@/utilities/func.util';

type CitiesFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: CitiesSchemaType;
};

const rule = createSchemaFieldRule(CitiesSchema);

export const CitiesForm = ({ open, onClose, initialValues }: CitiesFormProps) => {
  const [form] = Form.useForm<CitiesSchemaType>();

  const handleSubmit = async (values: CitiesSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} tỉnh/thành`}
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
        <Form.Item<CitiesSchemaType> name="name" label="Tên tỉnh/thành:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', getShortName(e.target.value));
              form.setFieldValue('slug', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<CitiesSchemaType> name="code" label="Mã:" rules={[rule]} required>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<CitiesSchemaType> name="slug" label="Slug:" rules={[rule]} required>
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
