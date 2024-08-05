'use client';

import {
  DatePicker,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  Modal,
  Radio,
  Rate,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { ModalProps } from 'antd/lib';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
interface IProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type FieldType = {
  customer_name?: string;
  id_card_number?: string;
  customer_address?: string;
  time?: string;
  purpose?: string;
  feedback?: string;
  review?: string;
  images?: FileType[];
  note?: string;
};
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const FormReportPopup = ({ open = false, onClose, onCancel, setOpen, onOk }: IProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isOpen, setIsOpen] = useState(open);
  const [isOpenPopupRate, setIsOpenPopupRate] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const [purposeOther, setPurposeOther] = useState('');
  const [feedbackOther, setFeedbackOther] = useState('');
  const [reviewOther, setReviewOther] = useState('');
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.purpose === 'other' && !purposeOther) return;
    if (values.feedback === 'other' && !feedbackOther) return;
    if (values.review === 'other' && !reviewOther) return;
    console.log('Success:', values);
    setIsOpenPopupRate(true);
    setOpen && setOpen(false);
    //
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <span className="text-xl">+</span>
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  useEffect(() => {
    form.setFieldsValue({
      purpose: '0',
      feedback: '0',
      review: '0',
    });
  }, [form]);

  return (
    <div>
      <Modal
        title="Báo cáo dẫn khách"
        centered
        okText="Lưu"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
        className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 "
        classNames={{
          content: 'dark:bg-background_d dark:text-primary_text_d !px-0 !py-3',
          header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-lg !px-3',
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
          >
            <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
            <div className="w-full px-5">
              <ul className="p-3 m-0">
                <li>
                  Để đầm bảo quyền lợi cho Chuyên viên Đầu khách, giải quyết việc khiểu nại nách,
                  cắt cầu v... Yêu cầu Chuyên viên Báo cáo lại cho Đầu chủ sau khi dẫn khách.
                </li>
                <li>
                  Thông tin Khách hàng sẽ được bảo mật. Đầu khách báo cáo thông tinkhách xem nhà đến
                  Đầu chủ theo mẫu bên dưới:
                </li>
                <li>
                  Lưu ý: Đầu khách kiểm tra lại nội dung thông tín trước khi gửi và tên của u chù
                  cần gừi báo cáo.
                </li>
              </ul>
            </div>
            <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
            <div className="w-full px-5 flex flex-col mt-3">
              <Form.Item<FieldType>
                label="Họ và tên khách xem nhà"
                className="[&_label]:min-w-64"
                name="customer_name"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <Input className="py-2 w-full" placeholder="Nhập họ tên của khách" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Số CMND/CCCD"
                className="[&_label]:min-w-64"
                name="id_card_number"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <Input className="py-2 w-full" placeholder="Nhập số CMND hoặc số CCCD của khách" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Địa chỉ khách ở"
                className="[&_label]:min-w-64 [&_label]:ps-2"
                name="customer_address"
              >
                <Input
                  className="py-2 w-full"
                  placeholder="VD: 102 P. Thái Thịnh, Ngã Tư Sở, Đống Đa, Hà Nội 100000"
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="Thời gian khách xem nhà"
                className="[&_label]:min-w-64"
                name="time"
                rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}
              >
                <DatePicker
                  showTime
                  showHour
                  showMinute
                  className="py-2 w-full"
                  placeholder="Chọn thời gian khách xem nhà"
                />
              </Form.Item>
              <div>
                <Form.Item<FieldType>
                  label="Mục đích mua của khách"
                  className="[&_label]:min-w-64 [&_.ant-form-item-explain-error]:pl-16"
                  name="purpose"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này',
                    },
                  ]}
                >
                  <Radio.Group className="flex gap-2 flex-col ">
                    <Radio value={'0'}>Mua để ở</Radio>
                    <Radio value={'1'}>Mua để kinh doanh</Radio>
                    <Radio
                      value={'other'}
                      className="[&>span:nth-child(2)]:inline-block [&>span:nth-child(2)]:flex-1 w-full"
                    >
                      <div className="flex items-center gap-2 w-full flex-col">
                        <div className="flex items-center gap-2 w-full">
                          <span>Khác</span>
                          <Input
                            disabled={Form.useWatch('purpose', form) !== 'other'}
                            onChange={(e) => {
                              const text = e.target.value;
                              setPurposeOther(text);
                            }}
                            className={clsx(
                              'flex-1 py-2',
                              Form.useWatch('purpose', form) === 'other' && purposeOther === ''
                                ? 'border-red-500'
                                : '',
                            )}
                            type="text"
                          />
                        </div>
                      </div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                {Form.useWatch('purpose', form) === 'other' && purposeOther === '' && (
                  <div className="text-red-500 text-sm ms-[320px] -mt-4 mb-3">
                    Vui lòng nhập trường này
                  </div>
                )}
              </div>

              <div>
                <Form.Item<FieldType>
                  label="Phản hồi của khách"
                  className="[&_label]:min-w-64 [&_.ant-form-item-explain-error]:pl-16"
                  name="feedback"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này',
                    },
                  ]}
                >
                  <Radio.Group className="flex gap-2 flex-col ">
                    <Radio value={'0'}>
                      Khách thích nhà - vị trí nhà hoặc hẹn người nhà đi xem lại
                    </Radio>
                    <Radio value={'1'}>Khách suy nghĩ thêm</Radio>
                    <Radio value={'2'}>Khách không thích nhà - vị trí nhà</Radio>
                    <Radio
                      value={'other'}
                      className="[&>span:nth-child(2)]:inline-block [&>span:nth-child(2)]:flex-1 w-full"
                    >
                      <div className="flex items-center gap-2 w-full flex-col">
                        <div className="flex items-center gap-2 w-full">
                          <span>Khác</span>
                          <Input
                            disabled={Form.useWatch('feedback', form) !== 'other'}
                            onChange={(e) => {
                              const text = e.target.value;
                              setFeedbackOther(text);
                            }}
                            className={clsx(
                              'flex-1 py-2',
                              Form.useWatch('feedback', form) === 'other' && feedbackOther === ''
                                ? 'border-red-500'
                                : '',
                            )}
                            type="text"
                          />
                        </div>
                      </div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                {Form.useWatch('feedback', form) === 'other' && feedbackOther === '' && (
                  <div className="text-red-500 text-sm ms-[320px] -mt-4 mb-3">
                    Vui lòng nhập trường này
                  </div>
                )}
              </div>
              <div>
                <Form.Item<FieldType>
                  label="Đánh giá của chủ nhà"
                  className="[&_label]:min-w-64 [&_.ant-form-item-explain-error]:pl-16"
                  name="review"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập trường này',
                    },
                  ]}
                >
                  <Radio.Group className="flex gap-2 flex-col ">
                    <Radio value={'0'}>Vui vẻ hợp tác</Radio>
                    <Radio value={'1'}>Thái độ và không Hợp tác</Radio>
                    <Radio
                      value={'other'}
                      className="[&>span:nth-child(2)]:inline-block [&>span:nth-child(2)]:flex-1 w-full"
                    >
                      <div className="flex items-center gap-2 w-full flex-col">
                        <div className="flex items-center gap-2 w-full">
                          <span>Khác</span>
                          <Input
                            disabled={Form.useWatch('review', form) !== 'other'}
                            onChange={(e) => {
                              const text = e.target.value;
                              setReviewOther(text);
                            }}
                            className={clsx(
                              'flex-1 py-2',
                              Form.useWatch('review', form) === 'other' && reviewOther === ''
                                ? 'border-red-500'
                                : '',
                            )}
                            type="text"
                          />
                        </div>
                      </div>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                {Form.useWatch('review', form) === 'other' && reviewOther === '' && (
                  <div className="text-red-500 text-sm ms-[320px] -mt-4 mb-3">
                    Vui lòng nhập trường này
                  </div>
                )}
              </div>
              <div className="flex items-stretch mb-3 [&_.ant-upload-list-item-actions]:flex [&_.ant-upload-list-item-actions]:justify-center">
                <div className="w-64 flex ps-1">Tải ảnh lên (tối đa 5 ảnh)</div>
                <div className="flex-1">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={5}
                    multiple
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                      alt={previewImage}
                    />
                  )}
                </div>
              </div>
              <Form.Item<FieldType>
                label="Ý kiến của đầu khách"
                className="[&_label]:min-w-64 [&_label]:ps-2"
                name="note"
              >
                <TextArea
                  className="py-2 w-full dark:bg-[#141414]"
                  placeholder="Ý kiến của đầu khách"
                  rows={6}
                />
              </Form.Item>
            </div>
            <div className="flex justify-between mt-3 px-6">
              <button
                className="w-[45%] cursor-pointer border-none py-1 rounded-md bg-background_l_2 text-black"
                onClick={(e) => {
                  e.preventDefault();
                  onClose && onClose(e);
                  setOpen && setOpen(false);
                }}
              >
                Huỷ
              </button>
              <button className="w-[45%] cursor-pointer border-none py-1 rounded-md text-white bg-color_l">
                Gửi
              </button>
            </div>
          </Form>
        </div>
      </Modal>
      <RatingPopup
        open={isOpenPopupRate}
        setOpen={setIsOpenPopupRate}
        onClose={() => {
          setIsOpenPopupRate(false);
        }}
      />
    </div>
  );
};
const RatingPopup = ({ open = false, onClose, onCancel, setOpen, onOk }: IProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const [rate, setRate] = useState({
    main: 0,
    attitude_when_calling: 0, // gọi điện
    enthusiasm: 0, // nhiệt tình
    negotiate: 0, // Đàm phán
    sign: 0, //ký
    update: 0,
    review: '',
    notification: 0, //0 | 1
  });
  const handleSubmit = () => {
    console.log('Success', rate);
    setOpen && setOpen(false);
  };
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <Modal
      title="Đánh giá đầu chủ"
      centered
      okText="Lưu"
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      open={isOpen}
      className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white p-0 my-5 "
      classNames={{
        content: 'dark:bg-background_d dark:text-primary_text_d !px-0 !py-3',
        header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-xl !px-3',
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
      <div className="w-full min-[500px]:w-[500px]">
        <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
        <div className="w-full flex justify-center items-center my-8 px-6">
          <Rate
            className="[&_svg]:w-10 [&_svg]:h-10"
            value={rate.main}
            onChange={(value) => setRate({ ...rate, main: value })}
            allowClear={false}
          />
        </div>
        <div className="w-full flex flex-col px-6 gap-3">
          <div className="flex justify-between">
            <span className="">Thái độ khi gọi điện</span>
            <Rate
              className="[&_svg]:w-6 [&_svg]:h-6"
              value={rate.attitude_when_calling}
              onChange={(value) => setRate({ ...rate, attitude_when_calling: value })}
              allowClear={false}
            />
          </div>
          <div className="flex justify-between">
            <span className="">Nhiệt tình hỗ trợ đầu khách</span>
            <Rate
              className="[&_svg]:w-6 [&_svg]:h-6"
              value={rate.enthusiasm}
              onChange={(value) => setRate({ ...rate, enthusiasm: value })}
              allowClear={false}
            />
          </div>
          <div className="flex justify-between">
            <span className="">Kỹ năng đàm phán</span>
            <Rate
              className="[&_svg]:w-6 [&_svg]:h-6"
              value={rate.negotiate}
              onChange={(value) => setRate({ ...rate, negotiate: value })}
              allowClear={false}
            />
          </div>
          <div className="flex justify-between">
            <span className="">Ký nhà chuẩn chỉ</span>
            <Rate
              className="[&_svg]:w-6 [&_svg]:h-6"
              value={rate.sign}
              onChange={(value) => setRate({ ...rate, sign: value })}
              allowClear={false}
            />
          </div>
          <div className="flex justify-between">
            <span className="">Thường xuyên cập nhật tình trạng nhà</span>
            <Rate
              className="[&_svg]:w-6 [&_svg]:h-6"
              value={rate.update}
              onChange={(value) => setRate({ ...rate, update: value })}
              allowClear={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="">
              <b>Nhận sét</b>(chỉ thư ký mới nhìn thấy)
            </span>
            <TextArea
              className="dark:bg-[#141414]"
              placeholder="Viết nhận sét"
              rows={4}
              value={rate.review}
              onChange={(e) => setRate({ ...rate, review: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <span className="">Đầu chủ có từng gạ chốt mà không báo về công ty không?</span>
            <Radio.Group
              value={rate.notification}
              onChange={(e) => setRate({ ...rate, notification: parseInt(e.target.value) })}
            >
              <Radio value={1}>Có</Radio>
              <Radio value={0}>Không</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 px-6">
          <button
            className="w-full cursor-pointer border-none text-base py-2 rounded-md text-white bg-color_l disabled:bg-white disabled:text-black disabled:opacity-50 disabled:border-black disabled:border disabled:border-solid"
            disabled={rate.main === 0}
            onClick={() => {
              handleSubmit();
            }}
          >
            Gửi đánh giá
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default FormReportPopup;
