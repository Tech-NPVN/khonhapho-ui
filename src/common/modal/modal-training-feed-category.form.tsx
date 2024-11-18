'use client';

import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { Button, Form, Input, Modal, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { z } from 'zod';
import { ModalWithHash } from './modal-with-hash';

export interface FormTrainingFeedCategoryTypes {
  name?: string;
  description?: string;
  type?: string;
  number_order?: number;
  status?: boolean;
}
export interface TrainingFeedCategoryModalProps {
  open?: boolean;
  defaultValue?: FormTrainingFeedCategoryTypes;
  onClose?: () => void;
}

const FormSchema = z.object({
  name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),
  description: z.string().min(1, REQUIRED_MSG_SAMPLE).max(500, 'Tối đa 500 ký tự').optional(),
  type: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),
  number_order: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .refine((num) => {
      return parseInt(num) > 0;
    }, 'Số thứ tự phải lơn hơn 0'),
  status: z.boolean({ message: REQUIRED_MSG_SAMPLE }),
});
const rule = createSchemaFieldRule(FormSchema);

type ModalClassInformationProps = {
  defaultValue?: FormTrainingFeedCategoryTypes;
  open?: boolean;
  onClose?: () => void;
};
const FormComponent: React.FC<ModalClassInformationProps> = ({ defaultValue, onClose }) => {
  const [form] = Form.useForm<FormTrainingFeedCategoryTypes>();
  const handleSubmit = (data: FormTrainingFeedCategoryTypes) => {
    console.log(data);
  };
  useEffect(() => {
    if (defaultValue) {
      console.log(defaultValue);
      const formValues: FormTrainingFeedCategoryTypes = { ...defaultValue };
      form.setFieldsValue(formValues);
    }
  }, [defaultValue, form]);

  const handleClose = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn đóng?',
      content: 'Nếu đóng, thông tin của bạn sẽ không được lưu lại.',
      centered: true,
      okText: 'Đóng',
      cancelText: 'Hủy',
      onOk: () => {
        onClose?.();
      },
      onCancel: () => {},
    });
  };
  return (
    <Form form={form} onFinish={handleSubmit} className="w-full flex flex-col gap-2 px-6">
      <div className="flex flex-col gap-2 max-sm:flex-wrap">
        <Form.Item<FormTrainingFeedCategoryTypes>
          name="name"
          label="Tên danh mục"
          rules={[rule]}
          required
          className="w-full !mb-0 [&_.ant-form-item-label]:!pb-0"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            size="large"
            className="w-full h-10"
            autoComplete="off"
            placeholder="Nhập tên danh mục"
          />
        </Form.Item>
        <Form.Item<FormTrainingFeedCategoryTypes>
          name="description"
          label="Mô tả"
          rules={[rule]}
          className="w-full !mb-0 [&_.ant-form-item-label]:!pb-0"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            size="large"
            className="w-full h-24"
            autoComplete="off"
            placeholder="Nhập tên danh mục"
          />
        </Form.Item>
        <Form.Item<FormTrainingFeedCategoryTypes>
          name="type"
          label="Loại Feed"
          rules={[rule]}
          required
          className="w-full !mb-0 [&_.ant-form-item-label]:!pb-0"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            size="large"
            className="w-full h-10"
            placeholder="Chia sẻ kỹ năng"
            options={[
              {
                value: '1',
                label: 'Feed kỹ nắng 1',
              },
              {
                value: '2',
                label: 'Feed kỹ năng 2',
              },
            ]}
          />
        </Form.Item>
        <Form.Item<FormTrainingFeedCategoryTypes>
          name="number_order"
          label="Số thứ tự"
          rules={[rule]}
          required
          className="w-full !mb-0 [&_.ant-form-item-label]:!pb-0"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="number"
            size="large"
            className="w-full h-10"
            autoComplete="off"
            placeholder="Nhập Số thứ tự"
          />
        </Form.Item>
        <Form.Item<FormTrainingFeedCategoryTypes>
          name="status"
          label="Trạng thái"
          rules={[rule]}
          required
          className="w-full !mb-0 [&_.ant-form-item-label]:!pb-0"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            size="large"
            className="w-full h-10"
            placeholder="Trạng thái hiện thị"
            options={[
              {
                value: true,
                label: 'Hiển thị',
              },
              {
                value: false,
                label: 'Ẩn',
              },
            ]}
          />
        </Form.Item>
      </div>
      <div>
        <div className="flex flex-col gap-2 mb-3">
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

            <Button className="text-base" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
const TrainingFeedCategoryModal: React.FC<TrainingFeedCategoryModalProps> = ({
  open,
  defaultValue,
  onClose,
}) => {
  return (
    <>
      <ModalWithHash
        open={open}
        hash="form-training-feed-category"
        onClose={() => onClose?.()}
        fullScreenInMobile
        antdModalProps={{
          title: 'Sửa danh mục',
          maskClosable: false,
          closable: false,
          className: 'lg:!max-w-[680px]',
        }}
      >
        <div>
          <FormComponent
            defaultValue={defaultValue}
            onClose={() => {
              window.history.back();
            }}
          />
        </div>
      </ModalWithHash>
    </>
  );
};
export { TrainingFeedCategoryModal };
