'use client';

import { Button, Form, Input, Modal } from "antd";
import { PurposeSchema, PurposeSchemaType } from "./purpose.schema";
import { createSchemaFieldRule } from "antd-zod";
import { convertSlugify } from "@/utilities/func.util";

type PurposeFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: PurposeSchemaType;
};

const rule = createSchemaFieldRule(PurposeSchema);

export const PurposeForm = ({ open, onClose, initialValues }: PurposeFormProps) => {
  const [form] = Form.useForm<PurposeSchemaType>();

  const handleSubmit = async (values: PurposeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} mục dích sử dụng`}
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
        <Form.Item<PurposeSchemaType> name="name" label="Mục đích:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<PurposeSchemaType> name="code" label="Mã:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<PurposeSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<PurposeSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
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
