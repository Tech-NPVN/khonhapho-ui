import { Routes } from '@/constants/enums';
import { Modal, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { UserType } from './type';

export type ModalListRatingProps = {
  user?: UserType;
  open?: boolean;
  onClose?: () => void;
};

/** Modal chọn khoảng thời gian khoá đăng bài viết mới */
const ModalListRating: React.FC<ModalListRatingProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onOk={() => {
        onClose?.();
      }}
      title="Đánh giá đầu chủ Bình Minh"
      onCancel={() => {
        onClose?.();
      }}
      centered
      width={600}
      footer={null}
    >
      <div>
        <div className="flex gap-3">
          <Image
            className="rounded-full overflow-hidden w-10 h-10"
            src={'/images/post-1.jpeg'}
            alt="/images/post-1.jpeg"
            width={100}
            height={100}
          />
          <div>
            <Link
              className="text-base text-link_text_l dark:text-link_text_d hover:underline"
              href={Routes.User + '/1'}
            >
              HV Nguyễn Phương Nam
            </Link>
            <div className="text-sm -mt-1">Người đánh giá</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="flex justify-between">
            <div className="font-bold text-base">Đánh giá</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="sm:max-w-[120px]">Thái độ khi gọi điện</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="sm:max-w-[120px]">Nhiệt tình hỗ trợ</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="sm:max-w-[120px]">Kỹ năng đàm phán</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="sm:max-w-[120px]">Ký nhà chuẩn chỉ</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="sm:max-w-[120px]">Cập nhật tình trạng bất động sản</div>
            <div className="min-w-[140px]">
              <Rate className="scale-75" allowHalf disabled defaultValue={3.5} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalListRating;
