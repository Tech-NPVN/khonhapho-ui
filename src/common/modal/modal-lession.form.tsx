import { REQUIRED_MSG_SAMPLE } from '@/constants/data';
import { LessionType } from '@/modules/admin/training-schedule/components/lessions/types';
import { Button, Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { z } from 'zod';
import { ModalWithHash } from './modal-with-hash';

type ModalLessionFormProps = {
  defaultValue?: LessionType;
  type?: 'create' | 'update' | 'view';
  open?: boolean;
  onClose?: () => void;
};
const FormSchema = z.object({
  name: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(100, 'Tối đa 100 ký tự'),

  content: z
    .string({ message: REQUIRED_MSG_SAMPLE })
    .min(1, REQUIRED_MSG_SAMPLE)
    .max(1000, 'Tối đa 1000 ký tự'),
});
const rule = createSchemaFieldRule(FormSchema);

type FormTypes = LessionType & {
  schedule_date?: any;
  schedule_start_time?: any;
  schedule_end_time?: any;
};
const FormComponent: React.FC<ModalLessionFormProps> = ({ type, defaultValue, onClose }) => {
  const [form] = Form.useForm<FormTypes>();
  const handleSubmit = (data: FormTypes) => {
    console.log(data);
  };
  useEffect(() => {
    if (defaultValue) {
      const formValues: FormTypes = { ...defaultValue };

      if (defaultValue.created_at)
        formValues.created_at = dayjs(defaultValue.created_at).format('DD/MM/YYYY HH:mm:ss');

      form.setFieldsValue(formValues);
    }
  }, [defaultValue, form, type]);

  const handleClose = () => {
    onClose?.();
  };
  return (
    <Form form={form} onFinish={handleSubmit} className="w-full flex flex-col gap-2 px-6">
      <div className="flex gap-4 max-sm:flex-wrap">
        <div className="flex flex-col w-full">
          <Form.Item<FormTypes>
            name="name"
            label="Tên bài giảng"
            rules={[rule]}
            required={type != 'view'}
            className="w-full !mb-2"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              size="large"
              className="w-full h-10"
              placeholder="Nhập tên bài giảng"
              readOnly={type === 'view'}
            />
          </Form.Item>
          <Form.Item<FormTypes>
            name="content"
            label="Nội dung bài giảng"
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
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 mb-3">
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
const ModalLessionForm: React.FC<ModalLessionFormProps> = ({
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
        hash="modal-lession"
        antdModalProps={{
          title:
            type === 'create'
              ? 'Tạo bài giảng mớI'
              : type === 'update'
              ? 'Cập nhật bài giảng'
              : 'Thông tin bài giảng',
          maskClosable: type === 'view',
          closable: type === 'view',
          className: '!max-w-[560px]',
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

export { ModalLessionForm };
