'use client';

import { Form, FormProps, Input, Modal, Select } from 'antd';
import { ModalProps } from 'antd/lib';
import { Dispatch, SetStateAction, useEffect } from 'react';
interface IProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  value?: FieldFormUrgentlyPopupType;
  isUpdate?: boolean;
}
type FieldFormUrgentlyPopupType = {
  city?: string;
  district?: string;
  price?: string;
  area?: string;
  request?: string;
};

const FormUrgentlyPopup = ({
  open = false,
  onClose,
  onCancel,
  setOpen,
  onOk,
  value,
  isUpdate,
}: IProps) => {
  const [form] = Form.useForm<FieldFormUrgentlyPopupType>();
  const onFinish: FormProps<FieldFormUrgentlyPopupType>['onFinish'] = (values) => {
    console.log('Success:', values);
    setOpen && setOpen(false);
    //
  };

  const onFinishFailed: FormProps<FieldFormUrgentlyPopupType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (value) form.setFieldsValue(value);
  }, [value, form]);
  return (
    <div>
      <Modal
        title={isUpdate ? 'Chỉnh sử bài viết' : 'Tạo bài viết'}
        centered
        okText="Lưu"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        open={open}
        className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 "
        classNames={{
          content: 'dark:bg-background_d dark:text-primary_text_d !px-0 !py-3',
          header:
            'text-center dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-lg !px-3',
          mask: 'dark:!fill-white',
        }}
        onClose={(e) => {
          onClose && onClose(e);
          setOpen && setOpen(false);
        }}
        onCancel={(e) => {
          onCancel && onCancel(e);
          setOpen && setOpen(false);
        }}
        onOk={(e) => {
          onOk && onOk(e);
          setOpen && setOpen(false);
        }}
        width={'auto'}
      >
        <div className="w-[750px]">
          <Form
            name="report"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            layout="vertical"
          >
            <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
            <div className="w-full px-5 flex flex-col mt-3">
              <Form.Item<FieldFormUrgentlyPopupType>
                label="Thành phố"
                name="city"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <Select
                  className="h-9 w-full"
                  placeholder="Chọn thành phố"
                  onChange={(value) => console.log(value)}
                >
                  <Select.Option value="ha-noi">Hà Nội</Select.Option>
                  <Select.Option value="hai-phong">Hải Phòng</Select.Option>
                  <Select.Option value="ho-chi-minh">Hồ Chí Minh</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldFormUrgentlyPopupType>
                label="Quận/Huyện"
                name="district"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <Select className="h-9 w-full" placeholder="Chọn quận huyện">
                  <Select.Option value="bac-tu-liem">Bắc Từ Liêm</Select.Option>
                  <Select.Option value="dong-da">Đống Đa</Select.Option>
                  <Select.Option value="hai-ba-trung">Hai Bà Trưng</Select.Option>
                </Select>
              </Form.Item>
              <div className="flex gap-2">
                <Form.Item<FieldFormUrgentlyPopupType>
                  className="flex-1"
                  label="Tài chính"
                  name="price"
                  rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                >
                  <Input className="py-2 w-full" placeholder="10-13 tỷ" />
                </Form.Item>
                <Form.Item<FieldFormUrgentlyPopupType>
                  className="flex-1"
                  label="Diện tích"
                  name="area"
                  rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
                >
                  <Input className="py-2 w-full" placeholder="102m²" />
                </Form.Item>
              </div>

              <Form.Item<FieldFormUrgentlyPopupType>
                className="flex-1"
                label="Yêu cầu"
                name="request"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập yêu cầu" />
              </Form.Item>
            </div>
            <div className="flex justify-center mt-3 px-6">
              <button className="w-[45%] cursor-pointer border-none py-1 rounded-md text-white bg-color_l">
                {isUpdate ? 'Cập nhật' : 'Đăng'}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default FormUrgentlyPopup;
export type { FieldFormUrgentlyPopupType };
