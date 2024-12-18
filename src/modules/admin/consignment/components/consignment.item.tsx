'use client';

import { modalError } from '@/common/modal';
import { TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import { ClockIcon, VerifiedIcon } from '@/components/icons';
import { DATE_TIME_FORMAT, WAREHOUSE_REASON_CONTENT_SAMPLE } from '@/constants/data';
import { Avatar, Button, Col, message, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ConsignmentReplyModal } from './consignment-reply.modal';
import { ConsignmentSchemaType } from './consignment-form.schema';
import { ConsignmentFormModal } from './consignment-form.modal';

const data: ConsignmentSchemaType = {
  type: 1,
  area: 200,
  owner_phone: '0123456789',
  city: 1,
  district: 2,
  address: '123',
  price: 3000000000,
  price_type: false,
  property_type: 'nha-rieng',
  title: 'Vẫn cứ là bình thường',
  content: 'Quá là điều bình thường luôn',
};

export const ConsignmentItem = () => {
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<ConsignmentSchemaType | undefined>(undefined);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}

      <div className="bg-primary_color_l dark:bg-primary_color_d lg:rounded-lg px-3 py-4">
        <div className={`${!isPublic ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3 items-center">
              <div className="relative">
                <VerifiedIcon className="absolute top-0 left-0 z-10" />
                <Avatar
                  src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                  className="flex-shrink-0 w-10 h-10"
                />
              </div>
              <div>
                <h4 className="mb-1">Nhà Phố Việt Nam</h4>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <ClockIcon />
                  <span>{dayjs(new Date()).format(DATE_TIME_FORMAT)}</span>
                </div>
              </div>
            </div>
            <Tag className="bg-color_l text-primary_color_l mr-0" bordered={false}>
              Nhà riêng
            </Tag>
          </div>

          <Row gutter={[10, 10]}>
            <Col span={24}>
              <p className="text-link_text_l dark:text-link_text_d text-base mb-0 font-medium">
                Đất 85m2 tại phố Trần Điền, Hoàng Mai - Giá 24,65 tỷ
              </p>
            </Col>

            <Col span={12}>
              <div className="mb-0">
                Giá: <span className="font-medium text-error_l dark:text-error_d">24,65 tỷ</span>
              </div>
            </Col>

            <Col span={12}>
              <div className="mb-0">
                Diện tích:{' '}
                <span className="font-medium text-error_l dark:text-error_d">
                  85m<sup>2</sup>
                </span>
              </div>
            </Col>

            <Col span={12}>
              <div className="mb-0">
                SĐT:{' '}
                <span className="font-medium text-link_text_l dark:text-link_text_d">
                  0912 345 678
                </span>
              </div>
            </Col>

            <Col span={24}>
              <div className="mb-0">
                Địa chỉ:{' '}
                <span className="font-medium">
                  Số 33 phố Trần Điền, Phường Định Công, Hoàng Mai, Hà Nội
                </span>
              </div>
            </Col>

            <Col span={24}>
              <TextSeeMore
                _html={WAREHOUSE_REASON_CONTENT_SAMPLE}
                maxLine={1}
                className="text-sm"
              />
            </Col>
          </Row>
        </div>

        <div className="flex justify-between mt-3">
          <CopyButton content="123" />

          <div className="flex gap-2">
            <Button
              type="default"
              className="dark:bg-transparent"
              onClick={() => {
                setIsPublic((prev) => !prev);
                messageApi.success('Cập nhật tin chính chủ thành công!');
              }}
            >
              {isPublic ? 'Ẩn tin' : 'Hiển thị'}
            </Button>
            <Button
              type="default"
              className="dark:bg-transparent"
              onClick={() => setOpenReply(true)}
            >
              Xem phản hồi
            </Button>
            <Button
              type="default"
              className="border-error_l dark:border-error_d text-error_l dark:text-error_d bg-transparent"
              onClick={() => {
                modalError({
                  title: 'Bạn có muốn xóa tin này?',
                  cancelText: 'Huỷ',
                  okText: 'Xoá',
                  centered: true,
                });
              }}
            >
              Xoá
            </Button>
            <Button type="default" className="dark:bg-transparent" onClick={() => setEdit(data)}>
              Sửa
            </Button>
            <Button type="primary" className="bg-[#398EBC]" onClick={() => {}}>
              Tin nhanh
            </Button>
          </div>
        </div>
      </div>

      <ConsignmentReplyModal open={openReply} onClose={() => setOpenReply(false)} />
      <ConsignmentFormModal
        open={Boolean(edit)}
        onClose={() => setEdit(undefined)}
        initialValues={edit}
      />
    </>
  );
};
