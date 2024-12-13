'use client';

import { Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { CompanySchema, CompanySchemaType } from './company.schema';
import useUpload, { UseUpload } from '@/hooks/use-upload';
import { UploadInput } from '@/components/common';
import { IMAGE_ACCEPTED } from '@/constants/data';
import { useCallback } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';

const rule = createSchemaFieldRule(CompanySchema);

export const CompanyForm = () => {
  const [form] = Form.useForm<CompanySchemaType>();

  const avatarUpload = useUpload();

  const handleSubmit = async (values: CompanySchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  const handleChangeUpload = useCallback(
    (
      upload: UseUpload,
      info: UploadChangeParam<UploadFile<any>>,
      name: keyof CompanySchemaType,
    ) => {
      upload.handleChange?.(info);
      form.setFieldValue(name, info.fileList);
      form.validateFields([[name]], { recursive: true });
    },
    [form],
  );

  return (
    <Form
      form={form}
      initialValues={{}}
      onFinish={handleSubmit}
      layout="vertical"
      labelCol={{ span: 24 }}
    >
      <Form.Item<CompanySchemaType> name="avatar" label="Avatar công ty:" rules={[rule]}>
        <UploadInput
          {...avatarUpload}
          accept={IMAGE_ACCEPTED}
          maxCount={1}
          handleChange={(info) => handleChangeUpload(avatarUpload, info, 'avatar')}
        />
      </Form.Item>

      <Form.Item<CompanySchemaType> name="name" label="Tên:" rules={[rule]}>
        <Input
          size="large"
          placeholder="Nhà Phố Việt Nam"
          className="h-10 dark:!bg-primary_color_d"
        />
      </Form.Item>
    </Form>
  );
};
