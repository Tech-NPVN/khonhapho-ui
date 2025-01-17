'use client';

import { Modal } from 'antd';
import { ModalProps } from 'antd/lib';
import { Dispatch, SetStateAction } from 'react';
interface IProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const ModalOwnerReview = ({ open = false, onClose, onCancel, setOpen, onOk }: IProps) => {
  return (
    <div>
      <Modal
        title="Đánh giá đầu chủ"
        centered
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        open={open}
        className="dark:bg-background_d dark:text-primary_text_d dark:[&_.ant-modal-close-icon_svg]:fill-white"
        classNames={{
          content: 'dark:bg-background_d dark:text-primary_text_d',
          header: 'dark:bg-background_d dark:[&>div]:!text-primary_text_d [&>div]:!text-lg',
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
        <div className="w-[550px]"></div>
      </Modal>
    </div>
  );
};

export { ModalOwnerReview };
