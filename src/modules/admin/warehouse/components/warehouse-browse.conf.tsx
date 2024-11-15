'use client';

import { MarqueeText } from '@/components/common';
import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import { ClockIcon } from '@/components/icons';
import { ImageGrid } from '@/components/reuse/data-display';
import { DATE_TIME_FORMAT } from '@/constants/data';
import { Avatar, Badge, Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Tag } from 'antd';
import dayjs from 'dayjs';

export const WarehouseBrowseConfirmModal = ({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) => {
  return (
    <Modal title="Duyệt hàng" open={open} onCancel={onCancel} width={880} footer={null} centered>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <Avatar
            src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            className="flex-shrink-0 w-10 h-10"
          />
          <div>
            <h4 className="mb-0">Nhà Phố Việt Nam</h4>
            <div className="flex items-center gap-2 opacity-60">
              <ClockIcon width={18} height={18} />
              <span className="max-md:text-xs">{dayjs(new Date()).format(DATE_TIME_FORMAT)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tag color="red" className="mr-0 max-md:hidden">
            Có sổ - Thiếu Seri sổ
          </Tag>
          <span className="text-[13px] max-md:hidden">
            Mã số: <span className="text-link_text_l dark:text-link_text_d">#28820</span>
          </span>
          <Tag
            className="bg-background_l dark:bg-background_d dark:text-primary_color_l font-medium rounded-lg mr-0"
            bordered={false}
          >
            Bán mạnh
          </Tag>
          <Tag bordered={false} color="#3FB44B">
            Duyệt hàng
          </Tag>
        </div>
      </div>
      <div className="flex mt-4 items-center gap-1">
        <h3 className="text-color_l mb-0 flex-shrink-0">27.727 tỷ</h3>
        <span className="flex-shrink-0">• 255.152tr/m</span>
        <Tag
          className="lg:!text-sm font-semibold bg-background_l dark:bg-background_d overflow-hidden ml-4"
          bordered={false}
        >
          <MarqueeText text="Mặt phố, kinh doanh, có tầng thượng, penhouse" className="max-w-52" />
        </Tag>
      </div>

      <div className="my-4">
        <p className="mb-1">
          11A Cao Bá Quát 46 5 5.2 29 tỷ Ba Đình Hà Nội HĐ TP Thái Tài NPHN-3369, 0384628527, X3,
          nguồn ĐT10, 25 đến 35, #ĐC2{' '}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span>Mô tả: </span>
          {['#NPVN', '#NP781', '#NP92193'].map((item) => (
            <span
              className="text-link_text_l dark:text-link_text_d cursor-pointer hover:underline lowercase"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <ImageGrid
        images={Array.from({ length: 3 }).map(
          (_) =>
            'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=600',
        )}
        maxImagePreview={4}
        horizontally
      />

      <div className="flex justify-end gap-1 items-center mt-2">
        <Button type="text">
          <MessengerKNPImage className="w-4 h-4" />
          <span className="opacity-70 max-sm:hidden">Chat nhà phố</span>
        </Button>
        <Button type="text">
          <MessengerImage className="w-4 h-4" />
          <span className="opacity-70 max-sm:hidden">Messenger</span>
        </Button>
        <Button type="text">
          <ZaloImage className="w-4 h-4" />
          <span className="opacity-70 max-sm:hidden">Zalo</span>
        </Button>
        <Button type="text">
          <PhoneImage className="w-4 h-4" />
          <span className="opacity-70 max-sm:hidden">Điện thoại</span>
        </Button>
      </div>

      <Divider className="bg-background_l dark:bg-background_d my-2" />
      <p>
        - Số diện thoại chủ nhà:{' '}
        <span className="text-link_text_l dark:text-link_text_d">0123456789</span>
      </p>

      <div className="mt-5">
        <h4 className="font-semibold text-base">Kiểm tra dữ liệu</h4>
        <div className="flex justify-between items-center">
          <span>
            Tổng số tin trùng <Badge count={2} className="badge-error ml-2" overflowCount={99} />
          </span>

          <Button type="default">Xem tin trùng</Button>
        </div>

        <Divider className="bg-background_l dark:bg-background_d my-3" />

        <Form layout="vertical">
          <Row gutter={[12, 12]}>
            <Col sm={24} md={12}>
              <Form.Item label="Xác nhận cho lên kho hàng">
                <Checkbox>Nhấn “Chấp nhận" đồng ý với lý do “Đủ điều kiện xét duyệt”.</Checkbox>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Từ chối duyệt">
                <Input.TextArea size="large" rows={4} placeholder="*Nhập lý do từ chối" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 12]}>
            <Col sm={24} md={12}>
              <Button disabled type='primary' block size='large'>Chấp nhận</Button>
            </Col>
            <Col sm={24} md={12}>
              <Button type='default' block size='large'>Từ chối</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
