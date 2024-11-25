'use client';

import { ModalWithHash } from '@/common/modal';
import { UploadInput } from '@/components/common';
import { IMAGE_ACCEPTED, REQUIRED_MSG_SAMPLE } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { phoneValidate } from '@/lib/zod';
import { Button, DatePicker, Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { z } from 'zod';
import { CandidateType } from '../types';

export type ModalCandidateProps = {
  open?: boolean;
  onClose?: () => void;
  defaultValue?: CandidateType;
};

const FormSchema = z.object({
  candidate_name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(50, 'Tối đa 50 ký tự'),
  candidate_birthday: z.any().refine((text) => !!text, REQUIRED_MSG_SAMPLE),
  candidate_phone: phoneValidate,
  candidate_id: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(12, 'Tối đa 12 ký tự')
    .refine((text) => text.length === 9 || text.length === 12, 'CCCD phải có 9 hoặc 12 ký tự')
    .refine((text) => /^[0-9]/.test(text), 'CCCD Không hợp lệ'),
  interview_time: z.any().refine((text) => !!text, REQUIRED_MSG_SAMPLE),
  images: z.array(z.any()).max(2, 'Tối đa 2 ảnh.').optional(),
});

interface CustomCandidateType extends CandidateType {
  candidate_birthday: any;
  interview_time?: any;
}
const rule = createSchemaFieldRule(FormSchema);
const FormComponent: React.FC<ModalCandidateProps> = ({ defaultValue, onClose }) => {
  const [form] = Form.useForm<CandidateType>();
  const imagesUpload = useUpload();
  const handleSubmit = (data: CandidateType) => {
    console.log(data);
  };
  useEffect(() => {
    if (defaultValue) {
      const formValues: CustomCandidateType = { ...defaultValue };
      formValues.candidate_birthday = dayjs(defaultValue.created_at);
      formValues.interview_time = dayjs(defaultValue.interview_time);
      form.setFieldsValue(formValues);
    }
  }, [defaultValue, form]);

  const handleClose = () => {
    onClose?.();
  };
  return (
    <Form form={form} onFinish={handleSubmit} className="w-full flex flex-col gap-2 px-6">
      <div className="flex gap-4 max-sm:flex-wrap">
        <div className="flex flex-col w-full">
          <Form.Item<CandidateType>
            name="candidate_name"
            label="Họ & Tên ứng viên"
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            required
          >
            <Input
              size="large"
              autoComplete="off"
              className="w-full h-10"
              placeholder="Tên ứng viên"
            />
          </Form.Item>
          <Form.Item<CandidateType>
            name="candidate_birthday"
            label="Ngày sinh"
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            required
          >
            <DatePicker className="w-full h-10" format="DD/MM/YYYY" placeholder="Chọn ngày sinh" />
          </Form.Item>
          <Form.Item<CandidateType>
            name="candidate_phone"
            label="Số điện thoại"
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            required
          >
            <Input
              size="large"
              autoComplete="off"
              className="w-full h-10"
              placeholder="Số điện thoại ứng viên"
            />
          </Form.Item>
          <Form.Item<CandidateType>
            name="candidate_id"
            label="CCCD ứng viên"
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            required
          >
            <Input
              size="large"
              autoComplete="off"
              className="w-full h-10"
              placeholder="Nhập số CCCD ứng viên"
            />
          </Form.Item>
          <Form.Item<CandidateType>
            name="interview_time"
            label="Thời gian phỏng vấn"
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            required
          >
            <DatePicker
              className="w-full h-10"
              format="DD/MM/YYYY HH:mm"
              placeholder="Chọn ngày sinh"
              showTime={{ showHour: true, showMinute: true, showSecond: false }}
            />
          </Form.Item>
          <Form.Item<CandidateType>
            name="images"
            label={
              <span className="flex flex-col justify-start">
                <span>Ảnh phỏng vấn</span>
                <span className="text-left">(Tối đa 2 ảnh)</span>
              </span>
            }
            rules={[rule]}
            className="w-full !mb-4 [&_label]:h-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <UploadInput {...imagesUpload} maxCount={2} multiple accept={IMAGE_ACCEPTED} />
          </Form.Item>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 mb-3 pb-3">
          <div className="flex justify-center mt-5 gap-3">
            {!defaultValue && (
              <Button
                onClick={form.submit}
                className="text-base bg-color_l border-color_l text-white"
              >
                Thêm
              </Button>
            )}
            {defaultValue && (
              <Button
                className="text-base bg-color_l border-color_l text-white"
                onClick={form.submit}
              >
                Cập nhật
              </Button>
            )}

            <Button
              className="text-base"
              onClick={() => {
                handleClose();
              }}
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

const HASH = 'candidate-form';
const ModalCandidate: React.FC<ModalCandidateProps> = ({ open, defaultValue, onClose }) => {
  return (
    <ModalWithHash
      open={open}
      onClose={onClose}
      fullScreenInMobile
      hash={HASH}
      antdModalProps={{
        title: defaultValue?.id ? 'Sửa thông tin ứng viên vòng 0' : 'Thêm ứng viên vòng 0',
        footer: null,
        centered: true,
        className: 'px-6 !max-w-[600px]',
        classNames: {
          header: 'pt-4 pb-3',
        },
      }}
    >
      <FormComponent defaultValue={defaultValue} onClose={onClose} />
    </ModalWithHash>
  );
};

export default ModalCandidate;
