'use client';

import { dateValidate } from '@/lib/zod';
import { Button, DatePicker, Divider, Form, Input, Modal } from 'antd';
import { z } from 'zod';
import { createSchemaFieldRule } from 'antd-zod';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants/data';
import { range } from '@/utilities/func.util';
import { memo } from 'react';

const BookingSchema = z.object({
  viewed_date: dateValidate,
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
export const ModalBooking = memo(
  ({ open, handleCancel }: { open: boolean; handleCancel: () => void }): JSX.Element => {
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
          initialValues={{
            viewed_date: dayjs(new Date()).add(30, 'minute'),
            description: '',
          }}
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
              classNames={{ popup: '123' }}
              disabledTime={(currentDate) => {
                const now = dayjs();
                if (currentDate.isSame(now, 'day')) {
                  if (now.minute() >= 30) {
                    return {
                      disabledHours: () => range(0, 24).splice(0, now.hour() + 1),
                      disabledMinutes: () => range(0, 60).splice(0, now.minute() + 30 - 60),
                    };
                  }
                  return {
                    disabledHours: () => range(0, 24).splice(0, now.hour()),
                    disabledMinutes: () => range(0, 60).splice(0, now.minute() + 30),
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

          <Button
            type="default"
            size="large"
            className="w-full bg-transparent"
            onClick={handleCancel}
          >
            Đóng
          </Button>
        </Form>
      </Modal>
    );
  },
);

ModalBooking.displayName = ModalBooking.name;
