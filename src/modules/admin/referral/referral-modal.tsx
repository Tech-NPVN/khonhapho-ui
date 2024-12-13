'use client';

import { ModalWithHash } from '@/common/modal';
import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { Form, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

export type ReferralModalProps = {
  onClose: () => void;
  open: boolean;
};
export type ReferralModalFormType = {
  branch?: string;
  department?: string;
  group?: string;
};
const FormSchema = z.object({
  branch: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  department: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),
  group: z.string().optional(),
});
const rule = createSchemaFieldRule(FormSchema);

const ReferralModal: React.FC<ReferralModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<ReferralModalFormType>();
  const [formValues, setFormValues] = useState<ReferralModalFormType>({});
  const handleValuesChange = (_: any, allValues: ReferralModalFormType) => {
    setFormValues(allValues);
  };

  const handleSubmit = (data: ReferralModalFormType) => {
    console.log(data);
  };
  useEffect(() => {
    !open && form.resetFields();
  }, [form, open]);
  return (
    <>
      <ModalWithHash
        open={open}
        onClose={onClose}
        hash="add-new-referral"
        antdModalProps={{
          title: 'Thêm mã giới thiệu',
          className: '!max-w-[600px]',
        }}
        fullScreenInMobile
      >
        <div className="w-full p-3 pb-6">
          <Form
            form={form}
            name="report"
            autoComplete="off"
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
          >
            <div className="w-full px-5 flex flex-col mt-3 [&_label]:text-base">
              <Form.Item<ReferralModalFormType>
                label="Chi nhánh"
                name="branch"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[rule]}
                required
              >
                <Select
                  className="h-10 text-base w-full"
                  size="middle"
                  placeholder="Chọn chi nhánh"
                  showSearch
                >
                  <Select.Option value="1">Chi nhánh 1</Select.Option>
                  <Select.Option value="2">Chi nhánh 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<ReferralModalFormType>
                label="Phòng ban"
                name="department"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[rule]}
                required
              >
                <Select
                  className="h-10 text-base w-full"
                  size="middle"
                  placeholder="Chọn phòng ban"
                  showSearch
                  disabled={!formValues.branch}
                >
                  <Select.Option value="1">Phòng 1</Select.Option>
                  <Select.Option value="2">Phòng 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<ReferralModalFormType>
                label="Nhóm"
                name="group"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  className="h-10 text-base w-full"
                  size="middle"
                  placeholder="Chọn nhóm"
                  disabled
                  showSearch
                ></Select>
              </Form.Item>
            </div>
            <div className="flex justify-end mt-3 px-6">
              <button className="px-6 cursor-pointer border-none py-2 rounded-md text-white bg-color_l text-base">
                Tạo mã
              </button>
            </div>
          </Form>
        </div>
      </ModalWithHash>
    </>
  );
};

export default ReferralModal;
