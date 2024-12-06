'use client';

import { createSchemaFieldRule } from 'antd-zod';
import { BlockSchema, BlockSchemaType } from './block.schema';
import { Button, Form, Input, Modal, Select } from 'antd';

type BlockFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: BlockSchemaType;
};

const rule = createSchemaFieldRule(BlockSchema);

export const BlockForm = ({ open, onClose, initialValues }: BlockFormProps) => {
  const [form] = Form.useForm<BlockSchemaType>();

  const handleSubmit = async (values: BlockSchemaType) => {
    console.log(values);
    // handle logic submit
    // ...
  };

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} khối`}
      open={open}
      onCancel={onClose}
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
        <Form.Item<BlockSchemaType> name="group" label="Các phòng:" required rules={[rule]}>
          <Select
            mode="multiple"
            size="large"
            className="w-full"
            placeholder="Chọn phòng"
            options={[
              {
                name: '0001 - NPVN - HÀ NỘI',
                code: 1,
              },
              {
                name: '0002 - NPVN - ĐÀ NẴNG',
                code: 2,
              },
            ]}
            fieldNames={{ label: 'name', value: 'code' }}
            allowClear
          />
        </Form.Item>

        <Form.Item<BlockSchemaType> name="leader" label="Giám đốc phòng:" required rules={[rule]}>
          <Select
            mode="multiple"
            size="large"
            className="w-full"
            placeholder="Chọn phòng"
            options={[]}
            // fieldNames={{ label: 'name', value: 'code' }}
            allowClear
          />
        </Form.Item>

        <Form.Item<BlockSchemaType> name="description" label="Mô tả:" rules={[rule]}>
          <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
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
