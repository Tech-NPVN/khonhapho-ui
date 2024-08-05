import { Button, DatePicker, Divider, Form, Input, Modal } from 'antd';
import { z } from 'zod';
import { createSchemaFieldRule } from 'antd-zod';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants/data';
import { WarehouseBooking } from '@/modules/client/warehouse/warehouse.model';
import { range } from '@/utilities/func.util';

const BookingSchema = z.object({
  viewed_date: z.preprocess((arg) => {
    if (dayjs.isDayjs(arg)) {
      return arg.toDate();
    }
    return arg;
  }, z.date({ message: 'Vui lòng chọn ngày' })),
  description: z.string().optional(),
});

type BookingSchemaType = z.infer<typeof BookingSchema>;

const rule = createSchemaFieldRule(BookingSchema);

/**
 * Modal booking - Modal Đặt lịch hẹn
 *
 * @property {boolean} [open]
 * @property {() => void} [handleCancel]
 * @returns {JSX.Element}
 */
export const ModalBooking = ({
  open,
  handleCancel,
}: {
  open: boolean;
  handleCancel: () => void;
}): JSX.Element => {
  const [form] = Form.useForm<BookingSchemaType>();

  const handleSubmit = async (values: BookingSchemaType) => {
    console.log(values);
    // handle logic register submit
    // ...
  };

  return (
    <Modal
      title="Đặt lịch hẹn dẫn khách xem nhà"
      open={open}
      onCancel={handleCancel}
      width={450}
      footer={null}
    >
      <Divider className="bg-background_l dark:bg-background_d my-4" />
      <Form
        form={form}
        initialValues={new WarehouseBooking()}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item<BookingSchemaType>
          name="viewed_date"
          label="Thời gian xem nhà"
          className="mb-4"
          rules={[rule]}
          required
        >
          <DatePicker
            size="large"
            showTime={{ format: TIME_FORMAT }}
            showSecond={false}
            format={DATE_TIME_FORMAT}
            placeholder="Chọn thời gian xem nhà"
            minDate={dayjs(new Date())}
            disabledTime={(currentDate) => {
              const now = dayjs();
              if (currentDate.isSame(now, 'day')) {
                return {
                  disabledHours: () => range(0, 24).splice(0, now.hour()),
                  disabledMinutes: () => range(0, 60).splice(0, now.minute()),
                };
              }

              return {};
            }}
          />
        </Form.Item>

        <Form.Item<BookingSchemaType>
          name="description"
          label="Ghi chú"
          className="mb-6"
          rules={[rule]}
        >
          <Input.TextArea size="large" rows={4} placeholder="Nhập ghi chú" />
        </Form.Item>

        <Button type="primary" htmlType="submit" size="large" className="w-full mt-5 mb-3">
          Đặt lịch
        </Button>

        <Button type="default" size="large" className="w-full" onClick={handleCancel}>
          Đóng
        </Button>
      </Form>
    </Modal>
  );
};
