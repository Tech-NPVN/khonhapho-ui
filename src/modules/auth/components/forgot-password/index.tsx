'use client';

import { MailIcon } from '@/components/icons';
import { Button, Form, Input } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from './forgot-password.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { Routes } from '@/constants/enums';

const rule = createSchemaFieldRule(ForgotPasswordSchema);

export const ForgotPasswordIndex = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [form] = Form.useForm<ForgotPasswordSchemaType>();

  const handleSubmit = async (values: ForgotPasswordSchemaType) => {
    // handle forgot password logic submit
    // ...
  };

  return (
    <div className="w-full flex flex-col justify-center md:w-[360px] h-screen md:h-auto bg-primary_color_l dark:bg-primary_color_d_2 rounded-xl p-6">
      <div className="flex w-full justify-center mb-10 mt-6">
        {theme === 'light' ? (
          <Image src="/logo-large-light.png" height={100} width={104} alt="logo" />
        ) : (
          <Image src="/logo-large-dark.png" height={100} width={104} alt="logo" />
        )}
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="email" className="mb-2" rules={[rule]}>
          <Input
            size="large"
            prefix={<MailIcon />}
            className="py-3 rounded-xl dark:bg-primary_color_d_3"
            placeholder="Email"
          />
        </Form.Item>
          <span className="text-secondary_text_l dark:text-secondary_text_d">
            Bạn sẽ nhận link xác thực lấy lại mật khẩu qua email này
          </span>

        <Button
          className="flex justify-center w-full text-base font-medium py-5 my-6 rounded-lg"
          type="primary"
          htmlType="submit"
        >
          Gửi
        </Button>
        <Button
          className="flex justify-center w-full text-base font-medium py-5 mt-1 text-link_text_l dark:text-link_text_d"
          type="text"
          htmlType="button"
          onClick={() => router.push(Routes.Login)}
        >
          Trở lại trang đăng nhập
        </Button>
      </Form>
    </div>
  );
};
