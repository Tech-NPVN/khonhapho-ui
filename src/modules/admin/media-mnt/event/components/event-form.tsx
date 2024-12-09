'use client';

import { UploadInput } from '@/components/common';
import { ArrowRightIcon } from '@/components/icons';
import { RequiredSymbolLabel } from '@/components/reuse/data-entry/required-symbol-label';
import { IMAGE_ACCEPTED, REQUIRED_MSG_SAMPLE } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { Button, Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import './custom.css';
type FormType = {
  name: string;
  content: string;
  images?: any;
};
const FormSchema = z.object({
  name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(200, 'Tối đa 200 ký tự')
    .refine((text) => text.trim().length > 5, 'Tên album phải có ít nhất 6 ký tự.'),
  content: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(2000, 'Tối đa 2000 ký tự')
    .refine((text) => text.trim().length > 5, 'Tên album phải có ít nhất 6 ký tự.'),
});
const rule = createSchemaFieldRule(FormSchema);

type EventFormProps = {
  id?: string;
};
/** (Admin) 'Index' Thêm/cập nhật sự kiện */
const EventForm: React.FC<EventFormProps> = ({ id }) => {
  const [form] = Form.useForm<FormType>();
  const [imageMessageError, setErrorMessage] = useState<string | undefined>();
  const imagesUpload = useUpload();
  const bannerUpload = useUpload();
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
          name: 'Sự kiện: ' + id,
          content: 'Nội dung sự kiện: ' + id,
        });
        imagesUpload.fileList.push({
          name: 'Album ' + id,
          uid: 'id-' + id,
          thumbUrl: '/images/post-1.jpeg',
          url: '/images/post-1.jpeg',
          status: 'done',
        });
        bannerUpload.fileList.push({
          name: 'banner ' + id,
          uid: 'id-' + id,
          thumbUrl: '/images/banner.png',
          url: '/images/banner.png',
          status: 'done',
        });
      }
    };
    if (!form.getFieldsValue().name) fetchData();
  }, [bannerUpload.fileList, form, id, imagesUpload.fileList]);
  return (
    <div className="m-4 ml-0 bg-white rounded-lg p-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Link href={'/admin/media/event'}>
            <Button className="-ms-3 bg-transparent border-none hover:bg-black/5">
              <ArrowRightIcon className="rotate-180 scale-125" />
            </Button>
          </Link>
          <span className="text-lg">{id ? 'Cập nhật sự kiện' : 'Thêm sự kiện mới'}</span>
        </div>
      </div>
      <Form className="w-full mt-3" form={form} onFinish={handleSubmit}>
        <div>
          <Form.Item<FormType>
            name="name"
            rules={[rule]}
            label="Tên sự kiện"
            required
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              size="large"
              className="h-10"
              placeholder="Nhập tên sự kiện"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item<FormType>
            name="content"
            rules={[rule]}
            label="Nội dung sự kiện"
            required
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea
              size="large"
              className="h-28"
              placeholder="Nhập nội dung sự kiện"
              autoComplete="off"
            />
          </Form.Item>
        </div>
        <div className="mt-3 mb-2">
          <div>
            <div className="flex">
              <div className="mb-3">Ảnh banner</div>
            </div>
          </div>
          <div className="">
            <div className=" media-banner flex dark:[&_.ant-upload.ant-upload-select]:!bg-white/10">
              <UploadInput {...bannerUpload} maxCount={1} accept={IMAGE_ACCEPTED} />
            </div>
            <div className="text-red-500">{imageMessageError}</div>
          </div>
        </div>
        <div className="mt-3 mb-2">
          <div>
            <div className="flex">
              <div className="be-3">
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

export default EventForm;
