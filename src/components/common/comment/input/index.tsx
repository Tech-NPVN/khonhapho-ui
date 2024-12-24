'use client';
import { SendIcon } from '@/components/icons';
import { Editor } from '@tiptap/core';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TiptapEditorForCommentInput } from '../tiptap';
import { CommentType } from '../types';
import { ImageUploadPreview } from './image-upload-preview';
import CommentInputMenu from './input-menu';
interface IImage {
  obj?: File;
  thumbUrl?: string;
}
type CommentInputProps = {
  className?: string;
  showAvatar?: boolean;
  defaultComment?: CommentType;
  showCancel?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onReady?: (editor: Editor) => void;
  onSendComment?: (comment?: CommentType) => void;
  onCancel?: () => void;
  onContentChange?: (comment?: CommentType) => void;
};

/** Nhập bình luận */
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
  const [comment, setComment] = useState<CommentType | undefined>(defaultComment);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [image, setImage] = useState<IImage | undefined>({
    obj: undefined,
    thumbUrl: defaultComment?.image,
  });

  const editorRef = useRef<Editor | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileChange(file);
  };
  const handleFileChange = (file?: File) => {
    if (!file) return;
    const thumbUrl = URL.createObjectURL(file);
    setImage({ obj: file, thumbUrl });
  };
  const handleCancelClick = () => {
    onCancel?.();
  };
  const addEmoji = (emoji: string) => {
    if (!editorRef.current) return;
    const { from } = editorRef.current.state.selection;
    editorRef.current.commands.insertContentAt(from, emoji);
  };
  const handleSubmit = () => {
    onSendComment?.({
      ...comment,
      image: image?.thumbUrl,
    } as CommentType);
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
    !!(comment && comment.text?.trim().replaceAll(/<p>\s*<\/p>/g, '')) || !!image?.thumbUrl;
  return (
    <div ref={rootRef} className={clsx('flex flex-1 max-w-full gap-3 items-end', className)}>
      {showAvatar && !isMobile && (
        <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden">
          <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
        </div>
      )}
      <div
        className={clsx(
          'relative flex flex-col',
          showAvatar ? (showAvatar && !isMobile ? 'w-[calc(100%-52px)]' : 'w-full') : ' w-full',
        )}
      >
        <div className="w-full">
          {image?.thumbUrl && (
            <ImageUploadPreview url={image.thumbUrl} onRemove={() => setImage(undefined)} />
          )}
        </div>
        <div className="w-full flex flex-col">
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
                <TiptapEditorForCommentInput
                  onReady={(editor) => {
                    onReady?.(editor);
                    if (editor && !editorRef.current) {
                      editorRef.current = editor;
                    }
                  }}
                  defaultContent={comment?.text}
                  className="w-full py-1 px-3 text-base"
                  disabled={disabled}
                  autoFocus={autoFocus}
                  onImagePaste={handleFileChange}
                  canShowSuggestions
                  onChange={(content) => {
                    setComment({ ...comment, text: content } as CommentType);
                  }}
                />
              </div>
              {!isMobile && (
                <CommentInputMenu
                  onImageChange={handleInputChange}
                  onEmojiChange={(emoji) => {
                    addEmoji(emoji ?? '');
                  }}
                />
              )}
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
          </div>
          <div
            className={clsx('w-full justify-between items-center', isMobile ? 'flex' : 'hidden')}
          >
            <CommentInputMenu
              onImageChange={handleInputChange}
              onEmojiChange={(emoji) => {
                addEmoji(emoji ?? '');
              }}
            />
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
          {showCancel && (
            <div
              className={clsx(
                'cursor-pointer text-right px-2 py-1 rounded text-error_l dark:text-error_d',
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
      </div>
    </div>
  );
};
export { CommentInput };
export type { CommentInputProps };
