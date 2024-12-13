import { CopyIcon } from '@/components/icons';
import { Modal, notification } from 'antd';
import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { UserType } from './type';

export type ModalResetPasswordProps = {
  open?: boolean;
  onClose?: () => void;
  user?: UserType;
};

/** Modal khoá đăng tin tài khoản */
const ModalResetPassword: React.FC<ModalResetPasswordProps> = ({ user, open, onClose }) => {
  const [_, onCopy] = useCopyToClipboard();
  const [password, setPassword] = useState<string>('');
  const handleOk = () => {
    if (password) onClose?.();
    else {
      setPassword(Math.random().toString(36).substr(2, 10));
      console.log('Reset password', password);
      // Send password to user's email or phone number to reset password
    }
  };

  return (
    <Modal
      title={'Cấp lại mật khẩu cho ' + (user?.name ?? '-')}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        onClose?.();
      }}
      cancelButtonProps={{
        style: { display: 'none' },
      }}
      okText={password ? 'Hoàn thành' : 'Tạo mật khẩu'}
      afterClose={() => {
        setPassword('');
      }}
      centered
      className="[&_.ant-modal-footer]:text-center"
    >
      <div>
        <div className="py-1 flex gap-3 items-center text-base">
          <div>{password ? 'Mật khẩu mới đã được tạo' : 'Nhấn để tạo tạo mật khẩu'}</div>
          {password ? (
            <div className="flex border border-solid border-black/30 rounded-lg items-center">
              <div className="p-3">{password}</div>
              <div className="h-10 w-[1px] bg-black/30"></div>
              <div
                className="p-3 cursor-pointer flex items-center justify-center"
                onClick={() => {
                  onCopy(password);
                  notification.success({
                    message: 'Đã sao chép vào bộ nhớ tạm',
                    placement: 'top',
                  });
                }}
              >
                <CopyIcon />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ModalResetPassword;
