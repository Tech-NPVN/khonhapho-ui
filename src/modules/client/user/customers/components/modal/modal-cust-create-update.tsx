import {
  REQUIRED_MSG_SAMPLE,
  SELECT_BUY_PURPOSE,
  SELECT_HOUSE_DIRECTION,
  SELECT_HOUSE_STATUS,
} from '@/constants/data';
import { identityValidate, phoneValidate } from '@/lib/zod';
import { formatMoneyVN } from '@/utilities/func.util';
import { Button, Checkbox, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { memo, useCallback, useState } from 'react';
import { z } from 'zod';

const CustCreateUpdateSchema = z.object({
  // Đánh giá
  rate: z.number().optional(),

  // Họ và tên
  full_name: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // CMND hoặc Thẻ căn cước của khách (Hoàn toàn được bảo mật)
  cccd: identityValidate,

  // Năm sinh khách
  birthday: z.string({ message: REQUIRED_MSG_SAMPLE }).length(4, 'Năm sinh chưa hơp lệ.'),

  // SĐT khách (Hoàn toàn được bảo mật)
  phone: phoneValidate.optional(),

  // Nơi khách ở
  address: z.string().optional(),

  // Tài chính tối đa
  money: z.number({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Khu vực cần mua
  districts_city: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Quận/Huyện
  districts_district: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .array()
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(3, 'Tối đa 3 đặc điểm.'),

  // Hướng nhà
  direction: z.string().optional(),

  // Mục đích mua
  purpose: z.string().optional(),

  // Tài chính sẵn sàng?
  finance_status: z.boolean().optional(),

  // Đã mua hụt nhà?
  miss: z.boolean().optional(),

  // Hiểu thị trường?
  understand: z.boolean().optional(),

  // Tôn trọng môi trường?
  honored: z.boolean().optional(),

  // Cần mua gấp?
  urgently: z.boolean().optional(),

  // Ghi chú yêu cầu
  description: z.string().optional(),

  // Hiện trạng
  purchase_status: z.string().optional(),
});

export type CustCreateUpdateSchemaType = z.infer<typeof CustCreateUpdateSchema>;

const rule = createSchemaFieldRule(CustCreateUpdateSchema);

export const ModalCustCreateUpdate = memo(
  ({
    open,
    handleCancel,
    initialValues,
  }: {
    open: boolean;
    handleCancel: () => void;
    initialValues?: CustCreateUpdateSchemaType;
  }) => {
    const [form] = Form.useForm<CustCreateUpdateSchemaType>();
    const [maskedValues, setMaskedValues] = useState({
      maskedPhone: '',
      maskedIdentity: '',
    });

    const money = Form.useWatch('money', form);

    const handleSubmit = async (values: CustCreateUpdateSchemaType) => {
      console.log(values);
      // ...
    };

    const maskNumber = useCallback((number: string) => {
      const length = number.length;

      if (length === 12 || length === 10) {
        return `${Array.from({ length: length - 5 })
          .map((_) => '*')
          .join('')}${number.slice(-5)}`;
      }

      return number;
    }, []);

    return (
      <Modal
        title="Thông tin khách hàng"
        open={open}
        onCancel={handleCancel}
        width={850}
        footer={null}
        centered
      >
        <p className="mb-0 mt-2 italic">
          Hỗ trợ quản lý khách hàng tốt hơn. Tìm nhà cho khách chính xác hơn. Báo cáo dẫn khách
          nhanh hơn. Tương tác Đầu chủ - Đầu khách - Trưởng phòng tối ưu hơn.
        </p>
        <Divider className="bg-background_l dark:bg-background_d my-6" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="horizontal"
          labelCol={{ span: 16, lg: 8, sm: 10 }}
          autoComplete="off"
        >
          <Form.Item<CustCreateUpdateSchemaType>
            name="full_name"
            label="Họ và tên khách hàng"
            rules={[rule]}
            required
          >
            <Input size="large" className="h-10 dark:!bg-primary_color_d" placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="cccd"
            label={
              <div className="flex flex-wrap">
                <p className="m-0">CMND hoặc Thẻ căn cước của khách</p>
                <i>(Hoàn toàn được bảo mật)</i>
              </div>
            }
            rules={[rule]}
            required
          >
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              onChange={(e) => {
                const value = e.target.value;
                setMaskedValues((prev) => ({ ...prev, maskedIdentity: value }));
                form.setFieldsValue({ cccd: maskNumber(value) });
              }}
              placeholder="Số CMND hoặc thẻ căn cước"
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="birthday"
            label="Năm sinh khách"
            rules={[rule]}
            required
          >
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="Năm sinh"
              type="number"
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="phone"
            label={
              <div className="flex flex-col items-start">
                <p className="m-0 flex-1">SĐT khách</p>
                <i>(Hoàn toàn được bảo mật)</i>
              </div>
            }
            rules={[rule]}
          >
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="SĐT khách hàng"
              onChange={(e) => {
                const value = e.target.value;
                setMaskedValues((prev) => ({ ...prev, maskedPhone: maskNumber(value) }));
                form.setFieldsValue({ phone: value });
              }}
              value={maskedValues.maskedPhone}
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType> name="address" label="Nơi khách ở" rules={[rule]}>
            <Input
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="VD: Thái Thịnh, Đống Đa"
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="money"
            label={
              <div className="flex flex-col justify-start items-start">
                <span>Tài chính tối đa</span>
                <i>{formatMoneyVN(money)}</i>
              </div>
            }
            rules={[rule]}
            required
          >
            <InputNumber<number>
              size="large"
              className="h-10 dark:!bg-primary_color_d"
              placeholder="Tài chính tối đa"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
              addonAfter="VNĐ"
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="districts_city"
            label="Khu vực cần mua"
            rules={[rule]}
            required
          >
            <Select
              placeholder="Tỉnh/Thành"
              size="large"
              className="w-full dark:!bg-primary_color_d"
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="districts_district"
            label="Quận/Huyện"
            rules={[rule]}
            required
          >
            <Select
              placeholder="Quận/Huyện"
              size="large"
              className="w-full dark:!bg-primary_color_d"
              disabled={!Form.useWatch('districts_city', form)}
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType> name="direction" label="Hướng nhà" rules={[rule]}>
            <Select
              size="large"
              className="w-full dark:!bg-primary_color_d"
              options={SELECT_HOUSE_DIRECTION}
              defaultValue={SELECT_HOUSE_DIRECTION[0].value}
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType> name="purpose" label="Mục đích mua" rules={[rule]}>
            <Select
              size="large"
              className="w-full dark:!bg-primary_color_d"
              options={SELECT_BUY_PURPOSE}
              defaultValue={SELECT_BUY_PURPOSE[0].value}
            />
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="finance_status"
            label="Tài chính sẵn sàng?"
            rules={[rule]}
          >
            <Checkbox>Sẵn sàng</Checkbox>
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType> name="miss" label="Đã mua hụt nhà?" rules={[rule]}>
            <Checkbox>Đã từng</Checkbox>
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="understand"
            label="Hiểu thị trường?"
            rules={[rule]}
          >
            <Checkbox>Đã hiểu</Checkbox>
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="honored"
            label="Tông trọng Môi giới?"
            rules={[rule]}
          >
            <Checkbox>Tôn trọng</Checkbox>
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType> name="urgently" label="Cần mua gấp?" rules={[rule]}>
            <Checkbox>Cần mua gấp</Checkbox>
          </Form.Item>

          <Form.Item<CustCreateUpdateSchemaType>
            name="description"
            label="Ghi chú yêu cầu"
            rules={[rule]}
          >
            <Input.TextArea
              size="large"
              rows={4}
              placeholder="Mặt đường, trong ngõ, 4 phòng ngủ, có ban công, gara ô tô,..."
            />
          </Form.Item>

          {initialValues && (
            <Form.Item<CustCreateUpdateSchemaType>
              name="purchase_status"
              label="Hiện trạng mua"
              rules={[rule]}
            >
              <Select
                size="large"
                className="w-full dark:!bg-primary_color_d"
                options={SELECT_HOUSE_STATUS}
                defaultValue={SELECT_HOUSE_STATUS[0].value}
              />
            </Form.Item>
          )}

          <Divider className="bg-background_l dark:bg-background_d my-6" />

          <div className="flex justify-end items-center gap-4">
            <Button htmlType="button" size="large" type="default" onClick={handleCancel}>
              Đóng
            </Button>
            <Button htmlType="submit" size="large" type="primary">
              Thêm
            </Button>
          </div>
        </Form>
      </Modal>
    );
  },
);

ModalCustCreateUpdate.displayName = ModalCustCreateUpdate.name;
