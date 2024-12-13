'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { AreaRangeSchema, AreaRangeSchemaType } from './area-range.schema';
import { Button, Form, Input, Modal } from 'antd';
import { convertSlugify, getShortName } from '@/utilities/func.util';

type AreaRangeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: AreaRangeSchemaType;
};

const rule = createSchemaFieldRule(AreaRangeSchema);

export const AreaRangeForm = ({ open, onClose, initialValues }: AreaRangeFormProps) => {
  const [form] = Form.useForm<AreaRangeSchemaType>();

  const handleSubmit = async (values: AreaRangeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} khoảng diện tích`}
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
        <Form.Item<AreaRangeSchemaType>
          name="name"
          label="Khoảng diện tích:"
          required
          rules={[rule]}
        >
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', getShortName(e.target.value));
              form.setFieldValue('slug', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<AreaRangeSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
        </Form.Item>

        <Form.Item<AreaRangeSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<AreaRangeSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
