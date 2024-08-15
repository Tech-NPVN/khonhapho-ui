'use client';

import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon, PasswordIcon, UserIcon } from '@/components/icons';
import { useCallback, useState } from 'react';
import { LoginSchema, LoginSchemaType } from './login.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/enums';
import { AuthLogin } from '../../auth.model';

const rule = createSchemaFieldRule(LoginSchema);

export const LoginIndex = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [form] = Form.useForm<LoginSchemaType>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSetPasswordState = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (values: LoginSchemaType) => {
    console.log(values);
    // handle logic login submit
    // ...
    router.push(Routes.Home);
  };

  return (
    <div className="w-full flex flex-col justify-center md:w-[360px] h-screen md:h-auto bg-primary_color_l dark:bg-background_d md:rounded-xl px-6 py-9">
      <div className="flex w-full justify-center mb-10">
        {theme === 'light' ? (
          <Image src="/logo-light.png" height={100} width={104} alt="logo" />
        ) : (
          <Image src="/logo-dark.png" height={100} width={104} alt="logo" />
        )}
      </div>

      <Form form={form} initialValues={new AuthLogin()} onFinish={handleSubmit}>
        <Form.Item<LoginSchemaType> name="username" className="mb-4" rules={[rule]}>
          <Input
            size="large"
            prefix={<UserIcon />}
            className="py-3 rounded-xl dark:!bg-primary_color_d dark:border-0"
            placeholder="Số điện thoại hoặc CCCD"
          />
        </Form.Item>
        <Form.Item<LoginSchemaType> name="password" className="mb-4" rules={[rule]}>
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

        <Checkbox onChange={() => {}} className="text-secondary_text_l dark:text-secondary_text_d">
          Lưu mật khẩu
        </Checkbox>

        <Button
          className="flex justify-center w-full text-base h-[40px] mt-4 rounded-lg"
          type="primary"
          htmlType="submit"
        >
          Đăng nhập
        </Button>
        <Button
          className="flex justify-center w-full text-base h-[40px] mt-1 text-link_text_l dark:!text-link_text_d"
          type="text"
          htmlType="button"
          onClick={() => router.push(Routes.ForgotPassword)}
        >
          Quên mật khẩu
        </Button>

        <Divider className="bg-background_l dark:bg-background_d mt-8 mb-6" />

        <Button
          className="flex justify-center w-full text-base rounded-lg h-[40px] mt-1 text-error_l
          border-error_l dark:text-error_d dark:border-transparent dark:bg-primary_color_d"
          type="default"
          htmlType="button"
          onClick={() => router.push(Routes.Register)}
        >
          Tạo tài khoản
        </Button>
      </Form>
    </div>
  );
};
