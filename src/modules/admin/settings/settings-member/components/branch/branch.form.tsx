'use client'

import { createSchemaFieldRule } from "antd-zod";
import { BranchSchema, BranchSchemaType } from "./branch.schema";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { convertSlugify } from "@/utilities/func.util";
import useFetchLocation from "@/hooks/use-fetch-location";
import { useEffect } from "react";

type BranchFormProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: BranchSchemaType;
};

const rule = createSchemaFieldRule(BranchSchema);

export const BranchForm = ({ open, onClose, initialValues }: BranchFormProps) => {
  const [form] = Form.useForm<BranchSchemaType>();

  const { cities, fetchCities } = useFetchLocation();

  const handleSubmit = async (values: BranchSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  useEffect(() => {
    if (cities.length === 0) fetchCities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      title={`${initialValues ? 'Sửa' : 'Thêm'} chi nhánh`}
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
        <Form.Item<BranchSchemaType>
          name="name"
          label="Tên chi nhánh:"
          required
          rules={[rule]}
        >
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            onBlur={(e) => {
              form.setFieldValue('code', convertSlugify(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item<BranchSchemaType> name="city" label="Thành phố:" rules={[rule]} required>
          <Select
            size="large"
            className="w-full"
            placeholder="Chọn thành phố"
            options={cities}
            fieldNames={{ label: 'name', value: 'id' }}
            showSearch
            optionFilterProp="name"
            allowClear
          />
        </Form.Item>

        <Form.Item<BranchSchemaType>
            name="headquarters"
            label="Trụ sở chính:"
            valuePropName='checked'
            rules={[rule]}
            // className="max-sm:[&>.ant-row]:grid max-sm:[&>.ant-row]:grid-cols-2 max-sm:mb-0 mb-1"
          >
            <Checkbox></Checkbox>
          </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
}