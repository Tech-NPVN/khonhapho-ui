'use client';

import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalProps } from 'antd/lib';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
interface IProps extends ModalProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
const NotePopup = ({ open = false, onClose, onCancel, setOpen, onOk }: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => {
        textareaRef?.current?.focus();
      }, 100);
    }
  }, [open]);
  return (
    <div>
      <Modal
        title="Ghi chú"
        centered
        okText="Lưu"
        cancelButtonProps={{ style: { display: 'none' } }}
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
        <div className="w-[550px]">
          <TextArea ref={textareaRef} rows={10} placeholder="Nhập ghi chú"></TextArea>
        </div>
      </Modal>
    </div>
  );
};

export default NotePopup;
