'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { StickerSchema, StickerSchemaType } from './sticker.schema';
import { Button, Form, Input, Modal, Select } from 'antd';
import useUpload, { UseUpload } from '@/hooks/use-upload';
import { UploadInput } from '@/components/common';
import { IMAGE_ACCEPTED } from '@/constants/data';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';
import { memo, useCallback } from 'react';

type StickerFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: StickerSchemaType;
};

const rule = createSchemaFieldRule(StickerSchema);

export const StickerForm = memo(({ open, onClose, initialValues }: StickerFormProps) => {
  const [form] = Form.useForm<StickerSchemaType>();

  const imagesUpload = useUpload(initialValues ? [...initialValues.images] : []);
  const avatarUpload = useUpload(initialValues ? [...initialValues.avatar] : []);

  const handleSubmit = async (values: StickerSchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  const handleChangeUpload = useCallback(
    (
      upload: UseUpload,
      info: UploadChangeParam<UploadFile<any>>,
      name: keyof StickerSchemaType,
    ) => {
      upload.handleChange?.(info);
      form.setFieldValue(name, info.fileList);
      form.validateFields([[name]], { recursive: true });
    },
    [form],
  );

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} sticker`}
      open={open}
      onCancel={onClose}
      onClose={onClose}
      width={600}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={
          initialValues ?? {
            status: 'hien-thi',
          }
        }
        onFinish={handleSubmit}
        layout="vertical"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<StickerSchemaType> name="avatar" label="Avatar:" rules={[rule]} required>
          <UploadInput
            {...avatarUpload}
            accept={IMAGE_ACCEPTED}
            maxCount={1}
            handleChange={(info) => handleChangeUpload(avatarUpload, info, 'avatar')}
          />
        </Form.Item>

        <Form.Item<StickerSchemaType> name="name" label="Tên:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<StickerSchemaType> name="images" label="Bộ ảnh sticker:" rules={[rule]} required>
          <UploadInput
            {...imagesUpload}
            accept={IMAGE_ACCEPTED}
            maxCount={999}
            multiple
            handleChange={(info) => handleChangeUpload(imagesUpload, info, 'images')}
          />
        </Form.Item>

        <Form.Item<StickerSchemaType> name="order" label="Thứ tự:" required rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" type="number" />
        </Form.Item>

        <Form.Item<StickerSchemaType> name="status" label="Hiển thị:" required rules={[rule]}>
          <Select
            size="large"
            className="w-full"
            options={[
              {
                name: 'Hiển thị',
                code: 'hien-thi',
              },
              {
                name: 'Không hiển thị',
                code: 'khong-hien-thi',
              },
            ]}
            fieldNames={{ label: 'name', value: 'code' }}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
});

StickerForm.displayName = StickerForm.name;
