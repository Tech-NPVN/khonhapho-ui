import { EyeIcon, EyeSlashIcon } from '@/components/icons';
import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useState } from 'react';
import { z } from 'zod';

const ChangePasswordSchema = z
  .object({
    old_password: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .min(6, { message: 'Nhập ít nhất 6 ký tự.' }),
    new_password: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .min(6, { message: 'Nhập ít nhất 6 ký tự.' }),
    confirm_password: z
      .string({ message: REQUIRED_MSG_SAMPLE })
      .min(6, { message: 'Nhập ít nhất 6 ký tự.' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu không khớp.',
    path: ['confirm_password'],
  });

type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

const rule = createSchemaFieldRule(ChangePasswordSchema);

export const ModalChangePassword = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm<ChangePasswordSchemaType>();

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = async (values: ChangePasswordSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={open}
      onCancel={handleCancel}
      width={450}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item<ChangePasswordSchemaType>
          name="old_password"
          label="Mật khẩu cũ"
          className="mb-4"
          rules={[rule]}
          required
        >
          <Input
            size="large"
            className="dark:!bg-primary_color_d dark:border-0"
            placeholder="(Ngày cập nhật: 08/10/2023)"
            type={showOldPassword ? 'text' : 'password'}
            suffix={
              showOldPassword ? (
                <EyeIcon onClick={() => setShowOldPassword((prev) => !prev)} />
              ) : (
                <EyeSlashIcon onClick={() => setShowOldPassword((prev) => !prev)} />
              )
            }
          />
        </Form.Item>

        <Form.Item<ChangePasswordSchemaType>
          name="new_password"
          label="Mật khẩu mới"
          className="mb-4"
          rules={[rule]}
          required
        >
          <Input
            size="large"
            className="dark:!bg-primary_color_d dark:border-0"
            placeholder="Nhập mật khẩu mới"
            type={showNewPassword ? 'text' : 'password'}
            suffix={
              showNewPassword ? (
                <EyeIcon onClick={() => setShowNewPassword((prev) => !prev)} />
              ) : (
                <EyeSlashIcon onClick={() => setShowNewPassword((prev) => !prev)} />
              )
            }
          />
        </Form.Item>

        <Form.Item<ChangePasswordSchemaType>
          name="confirm_password"
          label="Nhập lại mật khẩu"
          className="mb-4"
          rules={[rule]}
          required
        >
          <Input
            size="large"
            className="dark:!bg-primary_color_d dark:border-0"
            placeholder="Nhập lại mật khẩu mới"
            type={showConfirmPassword ? 'text' : 'password'}
            suffix={
              showConfirmPassword ? (
                <EyeIcon onClick={() => setShowConfirmPassword((prev) => !prev)} />
              ) : (
                <EyeSlashIcon onClick={() => setShowConfirmPassword((prev) => !prev)} />
              )
            }
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" size="large" className="w-full mt-5 mb-3">
          Đổi mật khẩu
        </Button>
      </Form>
    </Modal>
  );
};
