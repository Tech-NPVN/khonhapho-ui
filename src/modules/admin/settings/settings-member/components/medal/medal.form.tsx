'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { MedalSchema, MedalSchemaType } from './medal.schema';
import { Button, Form, Input, Modal } from 'antd';
import { convertSlugify } from '@/utilities/func.util';
import { UploadInput } from '@/components/common';
import useUpload from '@/hooks/use-upload';
import { IMAGE_ACCEPTED } from '@/constants/data';

type MedalFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: MedalSchemaType;
};

const rule = createSchemaFieldRule(MedalSchema);

export const MedalForm = ({ open, onClose, initialValues }: MedalFormProps) => {
  const [form] = Form.useForm<MedalSchemaType>();

  const imageUpload = useUpload(initialValues?.image ? [initialValues?.image] : undefined);

  const handleSubmit = async (values: MedalSchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} huy hiệu`}
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
        layout="vertical"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<MedalSchemaType> name="name" label="Tên:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<MedalSchemaType> name="code" label="Code:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<MedalSchemaType> name="image" label="Hình ảnh:" rules={[rule]} required>
          <UploadInput {...imageUpload} accept={IMAGE_ACCEPTED} maxCount={1} />
        </Form.Item>

        <Form.Item<MedalSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<MedalSchemaType> name="order" label="Thứ tự:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" type="number" />
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
