import { Modal, Select } from 'antd';
import React from 'react';
import { UserType } from './type';

export type ModalChangeRoleProps = {
  open?: boolean;
  onClose?: () => void;
  user?: UserType;
};

/** Modal thay đổi chức anh */
const ModalChangeRole: React.FC<ModalChangeRoleProps> = ({ user, open, onClose }) => {
  const handleOk = () => {
    onClose?.();
  };

  return (
    <Modal
      title={'Thay đổi chức danh cho ' + user?.name}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        onClose?.();
      }}
      afterClose={() => {}}
      className="[&_.ant-modal-footer]:text-center"
      centered
    >
      <div>
        <Select className="h-10 w-full" placeholder="Chức danh">
          <Select.Option value="1">Học Viên</Select.Option>
          <Select.Option value="2">Chuyên viên</Select.Option>
          <Select.Option value="3">Thư ký</Select.Option>
        </Select>
      </div>
    </Modal>
  );
};

export default ModalChangeRole;
