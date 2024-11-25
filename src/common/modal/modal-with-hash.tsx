import { Modal, ModalProps } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

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
    const [hashState, setHashState] = useState<string>('');

    // Hàm set hash khi mở modal
    const setHash = (newHash: string) => {
      if (!newHash.startsWith('#')) newHash = `#${newHash}`;
      if (window.location.hash !== newHash) history.pushState(null, '', newHash);
      setHashState(newHash.replace('#', ''));
    };

    // Hàm clear hash khi đóng modal
    const clearHash = () => {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setHashState('');
    };

    // Khi modal mở và có hash, set hash
    useEffect(() => {
      if (open && hash && hashState !== hash) setHash(hash);
      if (!open && hashState === hash) clearHash();
    }, [hash, hashState, open]);

    // Lắng nghe sự kiện hashchange và popstate để đóng modal khi hash thay đổi
    useEffect(() => {
      const handleLocationChange = () => {
        if (window.location.hash !== `#${hash}`) onClose?.();
      };

      window.addEventListener('popstate', handleLocationChange);
      window.addEventListener('hashchange', handleLocationChange);

      return () => {
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('hashchange', handleLocationChange);
      };
    }, [hash, hashState, onClose]);

    // Hàm đóng modal và clear hash
    const handleClose = () => {
      onClose?.();
      if (hash) clearHash();
    };

    return (
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
        onClose={handleClose}
      >
        {open ? children : null}
      </Modal>
    );
  },
);

ModalWithHash.displayName = 'ModalWithHash';
export { ModalWithHash };
