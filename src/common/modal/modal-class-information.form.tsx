import { RequiredSymbolLabel } from '@/components/reuse/data-entry/required-symbol-label';
import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { ScheduleTypes } from '@/modules/admin/meeting-schedule/types';
import { Button, DatePicker, Form, Input, Modal, Select, TimePicker } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { z } from 'zod';
import { QRCodeDownload } from '../qrcode';
import { ModalWithHash } from './modal-with-hash';

type ModalClassInformationProps = {
  defaultValue?: ScheduleTypes;
  type?: 'create' | 'update' | 'view';
  open?: boolean;
  onClose?: () => void;
};
const FormSchema = z.object({
  name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),
  location: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),
  area: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),
  content: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(1000, 'Tối đa 1000 ký tự'),
  schedule_date: z.any().refine((text) => !!text, REQUIRED_MSG_SAMPLE),
  schedule_start_time: z.any().refine((text) => !!text, REQUIRED_MSG_SAMPLE),
  schedule_end_time: z.any().refine((text) => !!text, REQUIRED_MSG_SAMPLE),
  role: z
    .array(z.string(), { message: REQUIRED_MSG_SAMPLE })
    .refine((arr) => !arr || arr.length > 0, REQUIRED_MSG_SAMPLE),
});
const rule = createSchemaFieldRule(FormSchema);

type FormTypes = ScheduleTypes & {
  schedule_date?: any;
  schedule_start_time?: any;
  schedule_end_time?: any;
};
const FormComponent: React.FC<ModalClassInformationProps> = ({ type, defaultValue, onClose }) => {
  const [form] = Form.useForm<FormTypes>();
  const handleSubmit = (data: FormTypes) => {
    console.log(data);
  };
  useEffect(() => {
    if (defaultValue) {
      const formValues: FormTypes = { ...defaultValue };
      if (defaultValue.time?.date) {
        formValues.schedule_date = dayjs(defaultValue.time.date, 'DD/MM/YYYY');
        formValues.schedule_start_time = dayjs(defaultValue.time.start_time, 'HH:mm');
        formValues.schedule_end_time = dayjs(defaultValue.time.end_time, 'HH:mm');
      }
      if (defaultValue.created_at)
        formValues.created_at = dayjs(defaultValue.created_at).format('DD/MM/YYYY HH:mm:ss');
      if (type === 'view')
        formValues.role = defaultValue?.role ? [defaultValue?.role?.join(', ')] : ['-'];
      form.setFieldsValue(formValues);
    }
  }, [defaultValue, form, type]);

  const handleClose = () => {
    if (type !== 'view') {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn đóng?',
        content: 'Nếu đóng, thông tin của bạn sẽ không được lưu lại.',
        centered: true,
        okText: 'Đóng',
        cancelText: 'Hủy',
        onOk: () => {
          onClose?.();
        },
        onCancel: () => {},
      });
    } else onClose?.();
  };
  return (
    <Form form={form} onFinish={handleSubmit} className="w-full flex flex-col gap-2 px-6">
      <div className="flex gap-4 max-sm:flex-wrap">
        <div className="flex flex-col w-full sm:w-1/2">
          <Form.Item<FormTypes>
            name="name"
            label="Tên khoá học"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              size="large"
              className="w-full h-10"
              placeholder="Nhập tên khoá học"
              readOnly={type === 'view'}
            />
          </Form.Item>
          <Form.Item<FormTypes>
            name="location"
            label="Địa điểm"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              size="large"
              className="w-full h-10"
              placeholder="Hội trường tầng 5 tháp A Tòa nhà 102 Thái Thịnh"
              readOnly={type === 'view'}
            />
          </Form.Item>
          <Form.Item<FormTypes>
            name="area"
            label="Khu vực"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2 [&_.ant-form-item-control-input]:min-h-10 [&_.ant-select-selector]:min-h-10"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            {type == 'view' && (
              <Input size="large" className="w-full min-h-10" placeholder="Khu vực" readOnly />
            )}
            {type != 'view' && (
              <Select
                className="w-full min-h-10 [&_.ant-select-selector]:dark:!bg-transparent"
                popupClassName="dark:bg-background_d [&_>div]:dark:bg-white/5 !p-0 [&_>div]:p-1"
                placeholder="Chọn khu vực"
              >
                <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                <Select.Option value="Hồ Chí Minh">Hồ Chí Minh</Select.Option>
                <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
                <Select.Option value="1">Huế</Select.Option>
              </Select>
            )}
          </Form.Item>
          <div className="mt-[6px]">
            <label className="inline-block mb-3">
              {type != 'view' && <RequiredSymbolLabel />}
              Lịch đào tạo
            </label>
            <div></div>
          </div>
          <div className="flex [&_.ant-picker-suffix]:hidden [&_.ant-picker-clear]:hidden [&_.ant-picker-outlined]:border-none [&_.ant-picker-outlined]:shadow-none focus-within:[&_.ant-picker-outlined]:border-none relative">
            <Form.Item<FormTypes>
              name="schedule_date"
              label=""
              rules={[rule]}
              required={type != 'view'}
              className="w-1/2 !mb-0 z-10"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                className="w-full h-10"
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
                inputReadOnly={type === 'view'}
                open={type == 'view' ? false : undefined}
              />
            </Form.Item>
            <Form.Item<FormTypes>
              label=""
              name="schedule_start_time"
              className="w-1/4 !mb-0 z-10"
              rules={[rule]}
            >
              <TimePicker
                className="h-10"
                format="HH:mm"
                minuteStep={5}
                placeholder="Bắt đầu"
                inputReadOnly={type === 'view'}
                open={type == 'view' ? false : undefined}
              />
            </Form.Item>
            <Form.Item<FormTypes>
              label=""
              className="w-1/4 !mb-0 z-10"
              name="schedule_end_time"
              rules={[
                rule,
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startTime = getFieldValue('schedule_start_time');
                    if (startTime && value) {
                      const startHour = startTime.hour();
                      const startMinute = startTime.minute();
                      const endHour = value.hour();
                      const endMinute = value.minute();
                      const timeDifference =
                        endHour * 60 + endMinute - (startHour * 60 + startMinute);
                      const minimum_duration_of_the_lesson = 60;
                      if (timeDifference >= minimum_duration_of_the_lesson) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          `Giờ kết thúc phải lớn hơn giờ bắt đầu ít nhất ${minimum_duration_of_the_lesson} phút`,
                        ),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                className="h-10"
                format="HH:mm"
                minuteStep={5}
                placeholder="Kết thúc"
                inputReadOnly={type === 'view'}
                open={type == 'view' ? false : undefined}
              />
            </Form.Item>
            <div className="absolute z-0 top-0 left-0 w-full h-10 border border-solid border-black/15 dark:border-white/15 rounded-lg"></div>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          {type != 'create' && (
            <Form.Item<FormTypes>
              name="created_at"
              label="Thời gian tạo"
              rules={[rule]}
              className="w-full !mb-2"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input size="large" className="w-full h-10" placeholder="" readOnly />
            </Form.Item>
          )}
          <Form.Item<FormTypes>
            name="content"
            label="Nội dung đào tạo"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea
              size="large"
              className="w-full min-h-32"
              placeholder="Đào tạo học viên mới"
              readOnly={type === 'view'}
            />
          </Form.Item>
          <Form.Item<FormTypes>
            name="role"
            label="Chức danh"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2 [&_.ant-form-item-control-input]:min-h-10 [&_.ant-select-selector]:min-h-10"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            {type == 'view' && (
              <Input size="large" className="w-full min-h-10" placeholder="Học viên" readOnly />
            )}
            {type != 'view' && (
              <Select
                mode="multiple"
                className="w-full min-h-10 [&_.ant-select-selector]:dark:!bg-transparent"
                popupClassName="dark:bg-background_d [&_>div]:dark:bg-white/5 !p-0 [&_>div]:p-1 [&_.ant-select-item-option]:!my-[1px]"
                placeholder="Chọn chức danh"
              >
                <Select.Option value="Học viên">Học viên</Select.Option>
                <Select.Option value="Đầu chủ">Đầu chủ</Select.Option>
                <Select.Option value="Chuyên viên">Chuyên Viên</Select.Option>
                <Select.Option value="1">Chuyên Viên 2</Select.Option>
                <Select.Option value="2">Chuyên Viên 3</Select.Option>
              </Select>
            )}
          </Form.Item>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 mb-3">
          {type === 'view' && (
            <div className="flex gap-3 mt-5 max-sm:justify-center">
              <div>
                <div className="text-center mb-2">QR Checkin</div>
                <div
                  onClick={() => {
                    console.log('qr Click');
                  }}
                >
                  <QRCodeDownload
                    title="Quét để điểm danh lớp học"
                    value={defaultValue?.qr_code?.check_in}
                    showOnClick
                    downloadProps={{
                      description: [
                        'Lớp học: ' + defaultValue?.name,
                        defaultValue?.content ?? '-',
                        '',
                        'Khu vực: ' + defaultValue?.area,
                        'Địa điểm: ' + defaultValue?.location,
                        'Thời gian: ' +
                          defaultValue?.time?.date +
                          ' ' +
                          defaultValue?.time?.start_time +
                          ' - ' +
                          defaultValue?.time?.end_time,
                      ],
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="text-center mb-2">QR Checkout</div>
                <div>
                  <QRCodeDownload
                    title="Quét để điểm danh kết thúc lớp học"
                    value={defaultValue?.qr_code?.check_out}
                    showOnClick
                    downloadProps={{
                      description: [
                        'Lớp học: ' + defaultValue?.name,
                        defaultValue?.content ?? '-',
                        'Khu vực: ' + defaultValue?.area,
                        'Địa điểm: ' + defaultValue?.location,
                        'Thời gian: ' +
                          defaultValue?.time?.date +
                          ' ' +
                          defaultValue?.time?.start_time +
                          ' - ' +
                          defaultValue?.time?.end_time,
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center mt-5 gap-3">
            {type === 'create' && (
              <Button
                onClick={form.submit}
                className="text-base bg-color_l border-color_l text-white"
              >
                Thêm
              </Button>
            )}
            {type === 'update' && (
              <Button
                className="text-base bg-color_l border-color_l text-white"
                onClick={form.submit}
              >
                Cập nhật
              </Button>
            )}

            <Button className="text-base" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
const ModalClassInformation: React.FC<ModalClassInformationProps> = ({
  open,
  type,
  defaultValue,
  onClose,
}) => {
  return (
    <>
      <ModalWithHash
        open={open}
        onClose={() => {
          onClose?.();
        }}
        hash="modal-class-information"
        antdModalProps={{
          title:
            type === 'create'
              ? 'Tạo lịch học mới'
              : type === 'update'
              ? 'Cập nhật lịch học'
              : 'Thông tin lớp học',
          maskClosable: type === 'view',
          closable: type === 'view',
        }}
      >
        {open && (
          <div className="flex flex-col py-2 gap-2 ">
            <FormComponent
              type={type}
              onClose={() => {
                window.history.back();
              }}
              defaultValue={defaultValue}
            />
          </div>
        )}
      </ModalWithHash>
    </>
  );
};

export { ModalClassInformation };
