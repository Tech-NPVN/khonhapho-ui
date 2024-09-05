'use client';
import {
  ModalAddCollection,
  ModalColCreateUpdate,
} from '@/modules/client/user/collection/components/modal';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BookmarkIcon, BookmarkOutlineIcon } from '../icons';

interface BookmarkButtonProps {
  saved?: boolean;
  className?: string;
  onClick?: () => void;
  onChange?: (state: boolean) => void;
}
const BookmarkButton = ({ saved, className, onChange, onClick }: BookmarkButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [openCreateCollection, setOpenCreateCollection] = useState<boolean>(false);
  useEffect(() => {
    setIsSaved(saved || false);
  }, [saved]);
  return (
    <>
      <div
        className={clsx('flex items-center', className)}
        onClick={() => {
          onClick?.();
          if (!isSaved) setIsShowModal(true);
        }}
      >
        {isSaved ? (
          <BookmarkIcon className="fill-[#FF4D4F] scale-[85%]" />
        ) : (
          <BookmarkOutlineIcon width={16} height={16} />
        )}
        <span className="ms-1">{isSaved ? 'Đã lưu' : 'Lưu'}</span>
      </div>
      <ModalAddCollection
        open={isShowModal}
        handleCancel={() => {
          setIsShowModal(false);
          onChange?.(false);
          setIsSaved(false);
        }}
        openCreate={() => {
          setOpenCreateCollection(true);
          console.log('openCreate');
        }}
      />
      <ModalColCreateUpdate
        open={openCreateCollection}
        handleCancel={() => setOpenCreateCollection(false)}
      />
    </>
  );
};

export { BookmarkButton };
