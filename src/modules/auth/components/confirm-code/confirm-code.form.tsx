'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { ConfirmCodeSchema, ConfirmCodeSchemaType } from './confirm-code.schema';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Alert, Button, Form, Input } from 'antd';
import Image from 'next/image';
import { ArrowRightIcon, UserIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import { useState } from 'react';

const rule = createSchemaFieldRule(ConfirmCodeSchema);

export const ConfirmCodeIndex = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [form] = Form.useForm<ConfirmCodeSchemaType>();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isFilled = Form.useWatch('code', form);

  const handleSubmit = async (values: ConfirmCodeSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <div className="w-full flex flex-col justify-center md:w-[500px] h-screen md:h-auto bg-primary_color_l dark:bg-background_d md:rounded-xl px-6 py-9">
      <div className="flex w-full justify-center mb-12">
        {theme === 'light' ? (
          <Image src="/logo-large-light.png" height={100} width={104} alt="logo" />
        ) : (
          <Image src="/logo-large-dark.png" height={100} width={104} alt="logo" />
        )}
      </div>

      <Form form={form} initialValues={{ code: '' }} onFinish={handleSubmit}>
        <Form.Item<ConfirmCodeSchemaType> name="code" className="mb-2" rules={[rule]}>
          <Input
            size="large"
            prefix={<UserIcon />}
            className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
            placeholder="Nhập mã giới thiệu"
          />
        </Form.Item>
        <span className="text-secondary_text_l dark:text-secondary_text_d">
          Nhập mã giới thiệu để tham gia phòng/đội nhóm.{' '}
        </span>

        <Button
          className="flex justify-center w-full text-base h-[40px] my-6 rounded-lg"
          type="primary"
          htmlType="submit"
          disabled={Boolean(!isFilled)}
        >
          Tiếp theo
        </Button>

        {showAlert ? (
          <Alert
            message="Bạn đã đăng ký Ứng viên thành công. Chúng tôi sẽ liên hệ lại bạn trong thời gian sớm nhất."
            showIcon
            type="warning"
            className="[&>span>svg]:text-3xl gap-2"
          />
        ) : (
          <Button
            className="flex justify-center w-full text-base h-[40px] my-6 rounded-lg"
            type="primary"
            onClick={() => setShowAlert(true)}
            disabled={Boolean(isFilled)}
          >
            Đăng ký ứng viên
          </Button>
        )}

        <Button
          className="flex justify-center w-full text-base h-[38px] bg-transparent text-color_l border-color_l mt-36 
          relative [&>.ant-btn-icon]:absolute [&>.ant-btn-icon]:left-3"
          type="default"
          htmlType="button"
          onClick={() => router.push(Routes.Login)}
          icon={<ArrowRightIcon className="rotate-180 [&>path]:!fill-color_l" />}
        >
          Đăng xuất
        </Button>

        <p className="text-center mt-4 mb-0 font-medium text-link_text_l dark:text-link_text_d">
          Hotline: 1900 0266
        </p>
      </Form>
    </div>
  );
};
