'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { GroupSchema, GroupSchemaType } from './group.schema';
import { Button, Form, Input, Modal, Select } from 'antd';

type GroupFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: GroupSchemaType;
};

const rule = createSchemaFieldRule(GroupSchema);

export const GroupForm = ({ open, onClose, initialValues }: GroupFormProps) => {
  const [form] = Form.useForm<GroupSchemaType>();

  const handleSubmit = async (values: GroupSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} nhóm`}
      open={open}
      onCancel={onClose}
      onClose={onClose}
      width={600}
      footer={null}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        className="mt-4"
      >
        <Form.Item<GroupSchemaType> name="name" label="Tên nhóm:" required rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            // onBlur={(e) => {
            //   form.setFieldValue('code', convertSlugify(e.target.value));
            // }}
          />
        </Form.Item>

        <Form.Item<GroupSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" />
        </Form.Item>

        <Form.Item<GroupSchemaType> name="department" label="Thành phố:" rules={[rule]} required>
          <Select
            size="large"
            className="w-full"
            // fieldNames={{ label: 'name', value: 'id' }}
            showSearch
            optionFilterProp="name"
            allowClear
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
