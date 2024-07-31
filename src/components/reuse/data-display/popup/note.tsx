'use client';

import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalProps } from 'antd/lib';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
interface IProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const NotePopup = ({ open = false, onClose, onCancel, setOpen, onOk }: IProps) => {
  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <div>
      <Modal
        title="Ghi chú"
        centered
        okText="Lưu"
        cancelButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
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
        <div className="w-[550px]">
          <TextArea rows={10}></TextArea>
        </div>
      </Modal>
    </div>
  );
};

export default NotePopup;
