import { DATE_FORMAT, REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import dayjs from 'dayjs';
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  // Tên hiển thị
  title: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Ngày sinh
  birthday: z.preprocess((arg) => {
    if (dayjs.isDayjs(arg)) {
      return arg.toDate();
    }
    return arg;
  }, z.date({ message: REQUIRED_MSG_SAMPLE })),

  // Họ và tên
  full_name: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Số điện thoại
  phone: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .length(10, { message: 'Số điện thoại bao gồm 10 số.' })
    .regex(/^0\d{9}$/, { message: 'SĐT không hợp lệ.' }),

  // Căn cước công dân (optional)
  cccd: z.string().length(12, { message: 'Căn cước công dân bao gồm 12 số.' }).optional(),

  // Ngày cấp
  cccd_date: z.preprocess((arg) => {
    if (dayjs.isDayjs(arg)) {
      return arg.toDate();
    }
    return arg;
  }, z.date({ message: REQUIRED_MSG_SAMPLE })),

  // Địa chỉ thường trú
  pr_address: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Nơi ở hiện tại
  address: z.string({ message: REQUIRED_MSG_SAMPLE }).min(1, REQUIRED_MSG_SAMPLE),

  // Email
  email: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .email({ message: 'Không đúng định dạng email' })
    .min(1, { message: REQUIRED_MSG_SAMPLE })
    .trim(),

  // SĐt người thân
  relatives_phone: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .length(10, { message: 'Số điện thoại bao gồm 10 số.' })
    .regex(/^0\d{9}$/, { message: 'SĐT không hợp lệ.' }),

  // Facebook URL (optional)
  facebook_link: z.string().url({ message: 'URL không hợp lệ' }).optional(),
});

type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

const rule = createSchemaFieldRule(UpdateProfileSchema);

const DEMO_PROFILE: UpdateProfileSchemaType = {
  title: 'Đẹp trai',
  full_name: 'Vẫn cứ là đẹp trai',
  birthday: dayjs(new Date()) as unknown as Date,
  cccd_date: dayjs(new Date()) as unknown as Date,
  address: '123',
  pr_address: '123',
  phone: '0123456789',
  relatives_phone: '0123456789',
  cccd: '123456789012',
  email: 'deptrai@gmail.com',
};

export const ModalUpdateProfile = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm<UpdateProfileSchemaType>();

  const handleSubmit = async (values: UpdateProfileSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title="Chỉnh sửa hồ sơ"
      open={open}
      onCancel={handleCancel}
      width={650}
      footer={null}
      centered
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Form form={form} initialValues={DEMO_PROFILE} onFinish={handleSubmit} layout="vertical">
        <Row gutter={15}>
          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="full_name"
              label="Họ và tên"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="birthday"
              label="Ngày sinh"
              rules={[rule]}
              required
              className="mb-4"
            >
              <DatePicker
                size="large"
                className="h-10 dark:!bg-primary_color_d"
                format={DATE_FORMAT}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="phone"
              label="Số điện thoại"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="cccd"
              label="Căn cước công dân"
              rules={[rule]}
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" disabled />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="cccd_date"
              label="Ngày cấp"
              rules={[rule]}
              required
              className="mb-4"
            >
              <DatePicker
                size="large"
                className="h-10 dark:!bg-primary_color_d"
                format={DATE_FORMAT}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="address"
              label="Nơi ở hiện tại"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="pr_address"
              label="Địa chỉ thường trú"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="email"
              label="Email"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="relatives_phone"
              label="SĐT người thân"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="facebook_link"
              label="Facebook"
              rules={[rule]}
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item<UpdateProfileSchemaType>
              name="title"
              label="Tên hiển thị"
              rules={[rule]}
              required
              className="mb-4"
            >
              <Input size="large" className="h-10 dark:!bg-primary_color_d" />
            </Form.Item>
          </Col>
        </Row>

        <div className="md:max-w-64 xs:max-w-full block m-auto pt-5">
          <Button htmlType="submit" type="primary" className="w-full" size="large">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
