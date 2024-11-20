import { Modal, ModalProps } from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';

interface ModalWithHashProps {
  open?: boolean;
  hash?: string;
  fullScreenInMobile?: boolean;
  onClose?: () => void;
  antdModalProps?: ModalProps;
  children: React.ReactNode;
}

const ModalWithHash: React.FC<ModalWithHashProps> = React.memo(
  ({ hash, open, fullScreenInMobile, children, antdModalProps = {}, onClose }) => {
    const handleClose = () => {
      onClose?.();
      if (hash) window.history.back();
    };

    useEffect(() => {
      if (open && hash) {
        if (window.location.hash !== hash) {
          window.history.pushState(null, '', `#${hash}`);
        }
      }
    }, [hash, open]);
    useEffect(() => {
      const handleLocationChange = () => {
        if (hash && window.location.hash !== hash) onClose?.();
      };
      window.addEventListener('hashchange', handleLocationChange);
      return () => {
        window.removeEventListener('hashchange', handleLocationChange);
      };
    }, [hash, onClose]);

    return (
      <>
        <Modal
          open={open}
          onCancel={handleClose}
          footer={null}
          centered
          width="100%"
          {...antdModalProps}
          className={clsx(
            'dark:text-primary_text_d b !p-0 sm:my-5 sm:w-[calc(100vw_-_100px)] md:max-w-[620px] lg:max-w-[720px] 2xl:max-w-[1024px]',
            fullScreenInMobile ? 'my-0 mx-0 w-full max-w-none' : '',
            antdModalProps.className,
          )}
          classNames={{
            content: clsx(
              'dark:bg-background_d dark:text-primary_text_d !p-0 ',
              fullScreenInMobile ? 'max-sm:rounded-none' : '',
              antdModalProps.classNames?.content,
            ),
            mask: clsx('!hidden', antdModalProps.classNames?.mask),
            wrapper: clsx(
              'bg-black/50 dark:bg-white/15 m-0 p-0 h-full w-full',
              antdModalProps.classNames?.wrapper,
            ),
            body: antdModalProps.classNames?.body,
            footer: antdModalProps.classNames?.footer,
            header: clsx(
              'text-center [&_.ant-modal-title]:text-lg pt-3',
              antdModalProps.classNames?.header,
            ),
          }}
          onClose={() => {
            handleClose();
          }}
        >
          {open ? children : null}
        </Modal>
      </>
    );
  },
);
ModalWithHash.displayName = 'ModalWithHash';
export { ModalWithHash };
