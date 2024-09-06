'use client';
import TiptapEditor from '@/common/tiptap';
import { ImageIcon, SendIcon, SmileyFaceIcon, StickerSelectIcon, XIcon } from '@/components/icons';
import { Editor } from '@tiptap/core';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CommentTypes } from './comment';
interface IImage {
  obj?: File;
  thumbUrl?: string;
}
interface CommentInputProps {
  className?: string;
  showAvatar?: boolean;
  defaultComment?: CommentTypes;
  showCancel?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onReady?: (editor: Editor) => void;
  onSendComment?: (comment?: CommentTypes) => void;
  onCancel?: () => void;
  onContentChange?: (comment?: CommentTypes) => void;
}
const CommentInput = ({
  className,
  defaultComment = undefined,
  showAvatar = false,
  showCancel,
  disabled,
  autoFocus,
  onContentChange,
  onSendComment,
  onCancel,
  onReady,
}: CommentInputProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<CommentTypes | undefined>(defaultComment);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [image, setImage] = useState<IImage | undefined>({
    obj: undefined,
    thumbUrl: defaultComment?.image,
  });
  const onchange = (comment: CommentTypes) => {
    setComment(comment);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const thumbUrl = URL.createObjectURL(file);
    setImage({ obj: file, thumbUrl });
  };
  const handleCancelClick = () => {
    // confirm({
    //   title: 'Xác nhận huỷ?',
    //   content: 'Bình luận của bạn chưa được lưu',
    //   cancelText: 'Đóng',
    //   okText: 'Xác nhận',
    //   onOk() {
    //     onCancel?.();
    //   },
    // });
    onCancel?.();
  };
  const handleSubmit = () => {
    onSendComment?.({
      ...comment,
      image: image?.thumbUrl,
    });
    setComment(undefined);
    setImage(undefined);
  };
  useEffect(() => {
    const handleResize = () => {
      const b = (rootRef.current?.clientWidth || 0) < 480;
      setIsMobile(b);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (onContentChange) {
      onContentChange(comment);
    }
  }, [image, comment, onContentChange]);
  const canSend =
    !!(comment && comment.body?.trim().replaceAll(/<p>\s*<\/p>/g, '')) || !!image?.thumbUrl;
  return (
    <div ref={rootRef} className={clsx('flex flex-1 gap-3', className)}>
      {showAvatar && !isMobile && (
        <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden">
          <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
        </div>
      )}
      <div
        className={clsx(
          'relative flex flex-col gap-2',
          showAvatar ? (showAvatar && !isMobile ? 'w-[calc(100%-40px)]' : 'w-full') : ' w-full',
        )}
      >
        <div className="w-full flex justify-between items-center relative">
          <div
            className={clsx(
              'bg-black/5 dark:bg-background_d rounded-2xl min-h-10 flex items-center justify-between h-full',
              isMobile ? 'w-full' : 'w-[calc(100%-40px)]',
            )}
          >
            <div
              className={clsx(
                'max-w-[calc(100%-108px)] w-full',
                isMobile ? 'max-w-full' : 'max-w-[calc(100%-108px)]',
              )}
            >
              <TiptapEditor
                onReady={onReady}
                content={comment?.body}
                onChange={(content, text) => {
                  onchange({ ...comment, body: content });
                }}
                className="w-full py-1 px-3 text-base"
                config={{
                  limit: 3000,
                  placeholder: 'Nhập bình luận...',
                }}
                disabled={disabled}
                autoFocus={autoFocus}
              />
            </div>
            <div className={clsx('flex me-2 items-center', isMobile ? 'hidden' : '')}>
              <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
                <ImageIcon />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
                <StickerSelectIcon />
              </label>
              <label className="w-8 h-8 rounded-full hover:bg-black/15 dark:hover:bg-white/15 flex items-center justify-center cursor-pointer p-1">
                <SmileyFaceIcon />
              </label>
            </div>
          </div>
          <button
            className={clsx(
              'min-w-10 max-w-10 h-10 border-none bg-transparent outline-none cursor-pointer items-center justify-center',
              isMobile ? 'hidden' : 'flex',
            )}
            disabled={!canSend}
            onClick={() => {
              handleSubmit();
            }}
          >
            <SendIcon
              className={clsx(
                !canSend ? '!fill-black/20 dark:!fill-[#daefff]/40' : '!fill-green-600',
              )}
            />
          </button>
          {showCancel && (
            <div
              className={clsx(
                'absolute top-full cursor-pointer right-0 px-2 py-1 rounded hover:text-error_l dark:hover:text-error_d',
                isMobile ? 'hidden' : '',
              )}
              onClick={() => {
                handleCancelClick();
              }}
            >
              Huỷ
            </div>
          )}
        </div>
        <div className={clsx('w-full justify-between items-center', isMobile ? 'flex' : 'hidden')}>
          <div className="flex me-2 items-center">
            <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
              <ImageIcon />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <label className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center cursor-pointer p-1">
              <StickerSelectIcon />
            </label>
            <label className="w-8 h-8 rounded-full hover:bg-black/15 dark:hover:bg-white/15 flex items-center justify-center cursor-pointer p-1">
              <SmileyFaceIcon />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            {showCancel && (
              <div
                className={clsx(
                  'cursor-pointer px-2 py-1 rounded text-error_l dark:text-error_d',
                  isMobile ? '' : 'hidden',
                )}
                onClick={() => {
                  handleCancelClick();
                }}
              >
                Huỷ
              </div>
            )}
            <button
              className={clsx(
                'min-w-10 max-w-10 h-10 border-none bg-transparent outline-none cursor-pointer items-center justify-center',
              )}
              disabled={!canSend}
              onClick={() => {
                handleSubmit();
              }}
            >
              <SendIcon
                className={clsx(
                  !canSend ? '!fill-black/20 dark:!fill-[#daefff]/40' : '!fill-green-600',
                )}
              />
            </button>
          </div>
        </div>
        {image?.thumbUrl && (
          <div className="flex-1">
            <div className="w-24 h-24 relative">
              <Image
                className="w-full h-full object-contain"
                src={image.thumbUrl ?? ''}
                alt="image-comment"
                width={0}
                height={0}
                unoptimized
              />
              <div className="absolute top-0 -right-7 w-6 h-6 flex justify-center items-center rounded-full bg-black/5 dark:bg-white/5 cursor-pointer">
                <XIcon
                  width={16}
                  height={16}
                  onClick={() => {
                    setImage(undefined);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export { CommentInput };
export type { CommentInputProps };
