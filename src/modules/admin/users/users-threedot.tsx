'use client';

import { ThreeDotIcon } from '@/components/icons';
import { Modal, notification, Popover } from 'antd';
import React, { useState } from 'react';
import ModalChangeRole from './modal-change-role';
import ModalListRating from './modal-list-rating';
import ModalLockFeed from './modal-lock-feed';
import ModalResetPassword from './modal-reset-password';
import ModalTitlesAndAwards from './modal-titles-and-awards';
import { UserType } from './type';

const Content: React.FC<UsersThreedotProps> = ({ user }) => {
  const [showModalLockFeed, setShowModalLockFeed] = useState<boolean>(false);
  const [showModalResetPassword, setShowModalResetPassword] = useState<boolean>(false);
  const [showModalChangeRole, setShowModalChangeRole] = useState<boolean>(false);
  const [showModalTitlesAndAwards, setShowModalTitlesAndAwards] = useState<boolean>(false);
  const [showModalListRating, setShowModalListRating] = useState<boolean>(false);
  // nút ấn dừng hợp tác
  const handleStopCooperation = () => {
    Modal.confirm({
      title: 'Thông báo',
      content: `Bạn có chắc muốn dừng hợp tác với ${user?.name} không?`,
      okText: 'Dừng',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        notification.success({ message: 'Đã dừng hợp tác với ' + user?.name, placement: 'top' });
      },
    });
  };
  const handleBlock = () => {
    Modal.confirm({
      title: 'Thông báo',
      content: `Bạn có muốn khoá tài khoản ${user?.name} không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        notification.success({ message: 'Đã khoá tài khoản ' + user?.name, placement: 'top' });
      },
    });
  };
  const handleAddToTraining = () => {
    Modal.confirm({
      title: 'Thông báo',
      content: `Bạn muốn mời ${user?.name} vào ban đào tạo không?`,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      centered: true,
      onOk: () => {
        notification.success({
          message: 'Đã mời ' + user?.name + ' vào ban đào tạo',
          placement: 'top',
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col w-full text-base">
        <button className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5">
          Xem/Sửa tài khoản
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={() => {
            setShowModalResetPassword(true);
          }}
        >
          Cấp lại mật khẩu
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={() => {
            setShowModalChangeRole(true);
          }}
        >
          Thay đổi chức danh
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={() => {
            setShowModalTitlesAndAwards(true);
          }}
        >
          Gán huy hiệu
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={() => {
            setShowModalLockFeed(true);
          }}
        >
          Khoá đăng tin
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={handleAddToTraining}
        >
          Mời vào ban đào tạo
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={() => setShowModalListRating(true)}
        >
          Xem đánh giá
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          onClick={handleBlock}
        >
          Tạm dừng (Khoá TK)
        </button>
        <button
          className="cursor-pointer px-3 py-2 bg-transparent border-none text-left disabled:opacity-40 hover:bg-black/5"
          disabled={false}
          onClick={handleStopCooperation}
        >
          Dừng hợp tác
        </button>
      </div>

      <ModalLockFeed open={showModalLockFeed} onClose={() => setShowModalLockFeed(false)} />
      <ModalResetPassword
        open={showModalResetPassword}
        onClose={() => setShowModalResetPassword(false)}
        user={user}
      />
      <ModalChangeRole
        open={showModalChangeRole}
        onClose={() => setShowModalChangeRole(false)}
        user={user}
      />
      <ModalTitlesAndAwards
        open={showModalTitlesAndAwards}
        onClose={() => setShowModalTitlesAndAwards(false)}
        user={user}
      />
      <ModalListRating
        open={showModalListRating}
        onClose={() => setShowModalListRating(false)}
        user={user}
      />
    </>
  );
};

type UsersThreedotProps = {
  user?: UserType;
};
const UsersThreedot: React.FC<UsersThreedotProps> = ({ user }) => {
  return (
    <div className="w-full flex justify-center">
      <Popover
        content={<Content user={user} />}
        trigger="click"
        placement="bottomRight"
        rootClassName="[&_.ant-popover-inner]:!p-1"
      >
        <div className="flex justify-center items-center w-8 h-8 rounded cursor-pointer">
          <ThreeDotIcon className="scale-125" />
        </div>
      </Popover>
    </div>
  );
};

export default UsersThreedot;
