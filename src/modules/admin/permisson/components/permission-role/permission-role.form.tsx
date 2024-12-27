'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { PermissionRoleSchema, PermissionRoleSchemaType } from './permission-role.schema';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { SectionBody } from '@/components/common';
import { useRouter } from 'next-nprogress-bar';
import React, { useCallback } from 'react';
import { ArrowBackIcon } from '@/components/icons';
import { getShortName } from '@/utilities/func.util';

const rule = createSchemaFieldRule(PermissionRoleSchema);

export const PermissionRoleForm = ({ id }: { id?: string }) => {
  const router = useRouter();

  const [form] = Form.useForm<PermissionRoleSchemaType>();

  const renderTitle = useCallback(() => {
    return (
      <div className="flex items-center gap-5">
        <button
          className="border-0 bg-transparent p-0 flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        {id ? 'Sửa chức danh' : 'Thêm chức danh'}
      </div>
    );
  }, [id, router]);

  const handleSubmit = async (values: PermissionRoleSchemaType) => {
    console.log(values);
  };

  return (
    <div className="mt-5 lg:pr-3">
      <SectionBody title={renderTitle()}>
        <Form
          form={form}
          initialValues={{}}
          onFinish={handleSubmit}
          layout="horizontal"
          labelCol={{ span: 16, lg: 4, sm: 8 }}
          className="mt-4"
        >
          <Form.Item<PermissionRoleSchemaType> name="name" label="Tên:" required rules={[rule]}>
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="VD: Giám đốc khu vực"
              onBlur={(e) => {
                form.setFieldValue('code', getShortName(e.target.value));
              }}
            />
          </Form.Item>

          <Form.Item<PermissionRoleSchemaType> name="code" label="Code:" required rules={[rule]}>
            <Input size="large" className="h-10 dark:!bg-primary_color_d" placeholder="VD: GĐKV" />
          </Form.Item>

          <Form.Item<PermissionRoleSchemaType>
            name="role_name"
            label="Chức danh:"
            required
            rules={[rule]}
          >
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="VD: Giám đốc khu vực"
            />
          </Form.Item>

          <Form.Item<PermissionRoleSchemaType> name="order" label="Thứ tự:" rules={[rule]}>
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              type="number"
              placeholder="Nhập thứ tự"
            />
          </Form.Item>

          <Form.Item<PermissionRoleSchemaType> name="description" label="Mô tả:" rules={[rule]}>
            <Input.TextArea
              size="large"
              className="dark:!bg-primary_color_d"
              placeholder="Nhập mô tả"
              rows={3}
            />
          </Form.Item>

          <Form.Item<PermissionRoleSchemaType>
            name="permission_group"
            label="Nhóm quyền:"
            rules={[rule]}
          >
            <Divider className="my-4" />
            {Array.from({ length: 8 }).map((_, index) => (
              <React.Fragment key={index}>
                <Checkbox>Nhóm Admin: Cập nhật thông tin địa điểm</Checkbox>
                <Divider className="my-3" />
              </React.Fragment>
            ))}
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" size="large" htmlType="submit" className="px-6">
              Lưu
            </Button>
          </div>
        </Form>
      </SectionBody>
    </div>
  );
};
