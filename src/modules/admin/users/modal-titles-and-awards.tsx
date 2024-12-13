import { Modal, notification, Select } from 'antd';
import Image from 'next/image';
import React from 'react';
import { selectFilterOption } from './helper';
import { UserType } from './type';

export type ModalTitlesAndAwardsProps = {
  open?: boolean;
  onClose?: () => void;
  user?: UserType;
};

/** Modal thay đổi chức anh */
const ModalTitlesAndAwards: React.FC<ModalTitlesAndAwardsProps> = ({ user, open, onClose }) => {
  const handleOk = () => {
    notification.success({
      message: 'Cập nhật danh hiệu thành công',
    });
    onClose?.();
  };

  return (
    <Modal
      title={'Thay đổi danh hiệu cho ' + user?.name}
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
        <Select
          className="h-12 w-full text-base [&_.ant-select-selection-item]:h-8 [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center"
          placeholder="Chọn danh hiệu"
          mode="multiple"
          showSearch
          filterOption={selectFilterOption}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Select.Option key={index} value={'id-' + index}>
              <div className="flex items-center gap-3 py-1">
                <Image src={'/images/zalo.png'} alt="/images/zalo.png" width={20} height={20} />
                <div>Chiến thần {index}</div>
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

export default ModalTitlesAndAwards;
