import { REQUIRED_MSG_SAMPLE, SELECT_BUY_PURPOSE, SELECT_HOUSE_DIRECTION } from '@/constants/data';
import { Button, Checkbox, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useCallback, useState } from 'react';
import { z } from 'zod';

const CustCreate = z.object({
  // Họ và tên
  full_name: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // CMND hoặc Thẻ căn cước của khách (Hoàn toàn được bảo mật)
  cccd: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .length(12, { message: 'Căn cước công dân bao gồm 12 số.' }),

  // Năm sinh khách
  birthday: z.string({ message: REQUIRED_MSG_SAMPLE }).length(4, 'Năm sinh chưa hơp lệ.'),

  // SĐT khách (Hoàn toàn được bảo mật)
  phone: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .length(10, 'Số điện thoại gồm 10 số.')
    .optional(),

  // Nơi khách ở
  address: z.string().optional(),

  // Tài chính tối đa
  money: z.number({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Khu vực cần mua
  districts_city: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Quận/Huyện
  districts_district: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

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
});

type CustCreateType = z.infer<typeof CustCreate>;

const rule = createSchemaFieldRule(CustCreate);

export const ModalCustCreate = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm<CustCreateType>();
  const [maskedValues, setMaskedValues] = useState({
    maskedPhone: '',
    maskedIdentity: '',
  });

  console.log(maskedValues.maskedIdentity);

  const handleSubmit = async (values: CustCreateType) => {
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
        Hỗ trợ quản lý khách hàng tốt hơn. Tìm nhà cho khách chính xác hơn. Báo cáo dẫn khách nhanh
        hơn. Tương tác Đầu chủ - Đầu khách - Trưởng phòng tối ưu hơn.
      </p>
      <Divider className="bg-background_l dark:bg-background_d my-6" />

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 16, lg: 8, sm: 10 }}
        autoComplete="off"
      >
        <Form.Item<CustCreateType>
          name="full_name"
          label="Họ và tên khách hàng"
          rules={[rule]}
          required
        >
          <Input size="large" className="h-10 dark:!bg-primary_color_d" placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item<CustCreateType>
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

        <Form.Item<CustCreateType> name="birthday" label="Năm sinh khách" rules={[rule]} required>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Năm sinh"
            type="number"
          />
        </Form.Item>

        <Form.Item<CustCreateType>
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
              setMaskedValues((prev) => ({ ...prev, maskedPhone: value }));
              form.setFieldsValue({ phone: maskNumber(value) });
            }}
          />
        </Form.Item>

        <Form.Item<CustCreateType> name="address" label="Nơi khách ở" rules={[rule]}>
          <Input
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="VD: Thái Thịnh, Đống Đa"
          />
        </Form.Item>

        <Form.Item<CustCreateType> name="money" label="Tài chính tối đa" rules={[rule]} required>
          <InputNumber<number>
            size="large"
            className="h-10 dark:!bg-primary_color_d"
            placeholder="Tài chính tối đa"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            addonAfter="VNĐ"
          />
        </Form.Item>

        <Form.Item<CustCreateType>
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

        <Form.Item<CustCreateType>
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

        <Form.Item<CustCreateType> name="direction" label="Hướng nhà" rules={[rule]}>
          <Select
            size="large"
            className="w-full dark:!bg-primary_color_d"
            options={SELECT_HOUSE_DIRECTION}
            defaultValue={SELECT_HOUSE_DIRECTION[0].value}
          />
        </Form.Item>

        <Form.Item<CustCreateType> name="purpose" label="Mục đích mua" rules={[rule]}>
          <Select
            size="large"
            className="w-full dark:!bg-primary_color_d"
            options={SELECT_BUY_PURPOSE}
            defaultValue={SELECT_BUY_PURPOSE[0].value}
          />
        </Form.Item>

        <Form.Item<CustCreateType> name="finance_status" label="Tài chính sẵn sàng?" rules={[rule]}>
          <Checkbox>Sẵn sàng</Checkbox>
        </Form.Item>

        <Form.Item<CustCreateType> name="miss" label="Đã mua hụt nhà?" rules={[rule]}>
          <Checkbox>Đã từng</Checkbox>
        </Form.Item>

        <Form.Item<CustCreateType> name="understand" label="Hiểu thị trường?" rules={[rule]}>
          <Checkbox>Đã hiểu</Checkbox>
        </Form.Item>

        <Form.Item<CustCreateType> name="honored" label="Tông trọng Môi giới?" rules={[rule]}>
          <Checkbox>Tôn trọng</Checkbox>
        </Form.Item>

        <Form.Item<CustCreateType> name="urgently" label="Cần mua gấp?" rules={[rule]}>
          <Checkbox>Cần mua gấp</Checkbox>
        </Form.Item>

        <Form.Item<CustCreateType> name="description" label="Ghi chú yêu cầu" rules={[rule]}>
          <Input.TextArea
            size="large"
            rows={4}
            placeholder="Mặt đường, trong ngõ, 4 phòng ngủ, có ban công, gara ô tô,..."
          />
        </Form.Item>

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
};
