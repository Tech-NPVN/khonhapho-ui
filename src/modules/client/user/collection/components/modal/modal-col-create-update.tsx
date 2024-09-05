'use client';

import { UploadInput } from '@/components/common';
import { IMAGE_ACCEPTED, REQUIRED_MSG_SAMPLE } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';

const CollectionFormSchema = z.object({
  title: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  image: z.union([z.array(z.string()), z.array(z.any())]),
});

export type CollectionFormSchemaType = z.infer<typeof CollectionFormSchema>;

const rule = createSchemaFieldRule(CollectionFormSchema);

export const ModalColCreateUpdate = ({
  open,
  handleCancel,
  initialValues,
}: {
  open: boolean;
  handleCancel: () => void;
  initialValues?: CollectionFormSchemaType;
}) => {
  const [form] = Form.useForm<CollectionFormSchemaType>();

  const imagesUpload = useUpload(initialValues?.image);

  const handleSubmit = async (values: CollectionFormSchemaType) => {
    console.log(values);
    // ...
  };

  return (
    <Modal
      title={initialValues ? 'Sửa' : 'Tạo' + ' bộ sưu tập'}
      open={open}
      onCancel={handleCancel}
      onClose={handleCancel}
      width={550}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />

      <Form
        form={form}
        initialValues={initialValues ?? {}}
        onFinish={handleSubmit}
        layout="horizontal"
      >
        <div className="flex flex-col justify-center items-center mb-6">
          <p className="text-center font-medium">Ảnh đại diện</p>
          <UploadInput
            {...imagesUpload}
            accept={IMAGE_ACCEPTED}
            maxCount={1}
            listType="picture-circle"
            className="[&>div>div]:w-32 [&>div>div]:h-32 [&>div>div]:dark:!bg-primary_color_d"
          />
        </div>

        <Form.Item<CollectionFormSchemaType> name="title" rules={[rule]}>
          <Input size="large" className="w-full h-10" placeholder="Nhập tên bộ sưu tập" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button type="text" size="large" htmlType="button" onClick={handleCancel}>
            Đóng
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            {initialValues ? 'Lưu' : 'Tạo'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
