'use client';

import { EyeIcon, EyeSlashIcon } from '@/components/icons';
import { Routes } from '@/constants/enums';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RegisterSchema, RegisterSchemaType } from './register.schema';
import { useCallback, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { DATE_FORMAT } from '@/constants/data';

const rule = createSchemaFieldRule(RegisterSchema);

export const RegisterIndex = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [form] = Form.useForm<RegisterSchemaType>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSetPasswordState = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSetConfirmPasswordState = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (values: RegisterSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <div className="w-full flex flex-col justify-center md:w-[540px] h-screen md:h-auto bg-primary_color_l dark:bg-primary_color_d_2 rounded-lg p-6">
      <div className="flex w-full justify-center mb-10 mt-6">
        {theme === 'light' ? (
          <Image src="/logo-large-light.png" height={100} width={104} alt="logo" />
        ) : (
          <Image src="/logo-large-dark.png" height={100} width={104} alt="logo" />
        )}
      </div>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="full_name"
              label="Họ và tên"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="phone_number"
              label="Số điện thoại"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="idenfity"
              label="Căn cước công dân"
              className="mb-2"
              rules={[rule]}
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="date_of_issuance"
              label="Ngày cấp"
              className="mb-2"
              rules={[rule]}
              required
            >
              <DatePicker
                size="large"
                format={DATE_FORMAT}
                className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="address"
              label="Địa chỉ thường trú"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="address_current"
              label="Nơi ở hiện tại"
              className="mb-2"
              rules={[rule]}
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="email"
              label="Email"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="phone_number_familiar"
              label="SĐT người thân"
              className="mb-2"
              rules={[rule]}
            >
              <Input size="large" className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="password"
              label="Mật khẩu"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input
                size="large"
                className="py-2 rounded-lg dark:bg-primary_color_d_3"
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
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="password_confirm"
              label="Xác nhận mật khẩu"
              className="mb-2"
              rules={[rule]}
              required
            >
              <Input
                size="large"
                className="py-2 rounded-lg dark:bg-primary_color_d_3"
                type={showConfirmPassword ? 'text' : 'password'}
                suffix={
                  showPassword ? (
                    <EyeIcon onClick={handleSetConfirmPasswordState} />
                  ) : (
                    <EyeSlashIcon onClick={handleSetConfirmPasswordState} />
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="date_of_birth"
              label="Ngày sinh"
              className="mb-2"
              rules={[rule]}
              required
            >
              <DatePicker
                size="large"
                format={DATE_FORMAT}
                className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<RegisterSchemaType>
              name="url_facebook"
              label="Link facebook cá nhân"
              className="mb-2"
              rules={[rule]}
            >
              <Input
                size="large"
                className="py-2 h-[42px] rounded-lg dark:bg-primary_color_d_3"
                placeholder="https://www.facebook.com/"
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          className="flex justify-center w-full text-base py-5 mt-6 rounded-lg"
          type="primary"
          htmlType="submit"
        >
          Đăng ký
        </Button>
        <Button
          className="flex justify-center w-full text-base py-5 mt-4 text-link_text_l dark:text-link_text_d"
          type="text"
          htmlType="button"
          onClick={() => router.push(Routes.Login)}
        >
          Trở vể đăng nhập
        </Button>
      </Form>
    </div>
  );
};
