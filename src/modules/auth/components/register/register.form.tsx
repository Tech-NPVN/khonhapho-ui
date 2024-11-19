'use client';

import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  MailIcon,
  PasswordIcon,
  PhoneOutlineIcon,
  UserIcon,
} from '@/components/icons';
import { Routes } from '@/constants/enums';
import { Button, Form, Input, message } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { RegisterSchema, RegisterSchemaType } from './register.schema';
import { useCallback, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { AuthRegister } from '../../auth.model';
import { useRouter } from 'next-nprogress-bar';

const rule = createSchemaFieldRule(RegisterSchema);

export const RegisterIndex = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [form] = Form.useForm<RegisterSchemaType>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSetPasswordState = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSetConfirmPasswordState = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (values: RegisterSchemaType) => {
    console.log(values);

    messageApi.open({
      type: 'success',
      content: 'Đăng ký thành công! Hãy nhập mã giới thiệu hoặc đăng ký ứng viên',
    });

    setTimeout(() => {
      router.push(Routes.ConfirmCode);
    }, 2000);
    // handle logic register submit
    // ...
  };

  return (
    <>
      {contextHolder}
      <div className="w-full flex flex-col justify-center md:w-[500px] h-screen md:h-auto bg-primary_color_l dark:bg-background_d md:rounded-xl px-6 py-9">
        <div className="flex w-full justify-center mb-10">
          {theme === 'light' ? (
            <Image src="/logo-light.png" height={100} width={104} alt="logo" />
          ) : (
            <Image src="/logo-dark.png" height={100} width={104} alt="logo" />
          )}
        </div>

        <Form form={form} initialValues={new AuthRegister()} onFinish={handleSubmit}>
          <div className="flex flex-col w-full items-center">
            {/* Họ và tên */}
            <Form.Item<RegisterSchemaType>
              name="full_name"
              rules={[rule]}
              className="mb-4 w-full"
              required
            >
              <Input
                size="large"
                prefix={<UserIcon />}
                className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
                placeholder="Họ và tên"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item<RegisterSchemaType>
              name="email"
              rules={[rule]}
              className="mb-4 w-full"
              required
            >
              <Input
                size="large"
                prefix={<MailIcon />}
                className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
                placeholder="Email"
              />
            </Form.Item>

            {/* Số điện thoại */}
            <Form.Item<RegisterSchemaType>
              name="phone_number"
              rules={[rule]}
              className="mb-4 w-full"
              required
            >
              <Input
                size="large"
                prefix={<PhoneOutlineIcon />}
                className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
                placeholder="Số điện thoại"
              />
            </Form.Item>

            <hr className="border-none h-[0.5px] bg-divider_l/10 dark:bg-divider_d/40 w-[300px]" />

            {/* Mật khẩu */}
            <Form.Item<RegisterSchemaType>
              name="password"
              rules={[rule]}
              className="my-4 w-full"
              required
            >
              <Input
                size="large"
                prefix={<PasswordIcon />}
                className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
                placeholder="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                suffix={
                  showPassword ? (
                    <EyeIcon onClick={handleSetPasswordState} />
                  ) : (
                    <EyeSlashIcon onClick={handleSetPasswordState} />
                  )
                }
              />
            </Form.Item>

            {/* Xác minh mật khẩu */}
            <Form.Item<RegisterSchemaType>
              name="password_confirm"
              rules={[rule]}
              className="mb-4 w-full"
              required
            >
              <Input
                size="large"
                prefix={<PasswordIcon />}
                className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
                placeholder="Xác minh mật khẩu"
                type={showConfirmPassword ? 'text' : 'password'}
                suffix={
                  showConfirmPassword ? (
                    <EyeIcon onClick={handleSetConfirmPasswordState} />
                  ) : (
                    <EyeSlashIcon onClick={handleSetConfirmPasswordState} />
                  )
                }
              />
            </Form.Item>
          </div>

          <Button
            className="flex justify-center w-full text-base h-[38px] mt-6 rounded-lg"
            type="primary"
            htmlType="submit"
          >
            Đăng ký
          </Button>
          <Button
            className="flex justify-center w-full text-base font-medium h-[38px] mt-4 bg-transparent text-color_l border-color_l
          relative [&>.ant-btn-icon]:absolute [&>.ant-btn-icon]:left-3"
            type="default"
            htmlType="button"
            onClick={() => router.push(Routes.Login)}
            icon={<ArrowRightIcon className="rotate-180 [&>path]:!fill-color_l" />}
          >
            Trở vể đăng nhập
          </Button>
        </Form>
      </div>
    </>
  );
};
