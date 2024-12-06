'use client';

import { UploadInput } from '@/components/common';
import { ArrowRightIcon } from '@/components/icons';
import { RequiredSymbolLabel } from '@/components/reuse/data-entry/required-symbol-label';
import { IMAGE_ACCEPTED, REQUIRED_MSG_SAMPLE } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { Button, Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

type FormType = {
  name: string;
  images?: any;
};
const FormSchema = z.object({
  name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(200, 'Tối đa 200 ký tự')
    .refine((text) => text.trim().length > 5, 'Tên album phải có ít nhất 6 ký tự.'),
});
const rule = createSchemaFieldRule(FormSchema);

type PhotoGalleryFormProps = {
  id?: string;
};
/** (Admin) 'Index' Thêm/cập nhật thư viện hình ảnh */
const PhotoGalleryForm: React.FC<PhotoGalleryFormProps> = ({ id }) => {
  const [form] = Form.useForm<FormType>();
  const [imageMessageError, setErrorMessage] = useState<string | undefined>();
  const imagesUpload = useUpload();
  const handleSubmit = (data: FormType) => {
    if (imagesUpload.fileList.length == 0) {
      setErrorMessage('Vui lòng chọn ít nhất 1 ảnh');
      return;
    }

    console.log(data);
  };
  useEffect(() => {
    if (imagesUpload.fileList.length != 0) setErrorMessage(undefined);
  }, [imagesUpload.fileList.length]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        form.setFieldsValue({
          name: 'album-' + id,
        });
        imagesUpload.fileList.push({
          name: 'Album ' + id,
          uid: 'id-' + id,
          thumbUrl: '/images/post-1.jpeg',
          url: '/images/post-1.jpeg',
          status: 'done',
        });
      }
    };
    if (!form.getFieldsValue().name) fetchData();
  }, [form, id, imagesUpload.fileList]);
  return (
    <div className="m-4 ml-0 bg-white rounded-lg p-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Link href={'/admin/media/photo-gallery'}>
            <Button className="-ms-3 bg-transparent border-none hover:bg-black/5">
              <ArrowRightIcon className="rotate-180 scale-125" />
            </Button>
          </Link>
          <span className="text-lg">{id ? 'Cập nhật thư viện' : 'Thêm thư viện hình ảnh mới'}</span>
        </div>
      </div>
      <Form className="w-full mt-3" form={form} onFinish={handleSubmit}>
        <div>
          <Form.Item<FormType>
            name="name"
            rules={[rule]}
            label="Tên album"
            required
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
          >
            <Input size="large" className="h-10" placeholder="Nhập tên album" autoComplete="off" />
          </Form.Item>
        </div>
        <div className="mt-3 mb-2">
          <div className="flex">
            <div className="me-3">
              <RequiredSymbolLabel />
              Ảnh
            </div>
          </div>
        </div>
        <div className="[&_.ant-upload-list-picture-card>div]:!w-[200px] [&_.ant-upload-list-picture-card>div]:!h-[200px]">
          <div className="flex dark:[&_.ant-upload.ant-upload-select]:!bg-white/10">
            <UploadInput {...imagesUpload} maxCount={999} multiple accept={IMAGE_ACCEPTED} />
          </div>
          <div className="text-red-500">{imageMessageError}</div>
        </div>
        <div className="w-full flex justify-center mt-3">
          <Button type="primary" htmlType="submit">
            {id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PhotoGalleryForm;
