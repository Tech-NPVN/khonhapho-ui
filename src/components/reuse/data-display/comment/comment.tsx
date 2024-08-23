'use client';

import { getTimeAgo } from '@/common/helpers';
import TiptapEditor from '@/common/tiptap';
import {
  CommentIcon,
  HeartRedIcon,
  ImageIcon,
  SmileyFaceIcon,
  StickerSelectIcon,
  ThreeDotIcon,
} from '@/components/icons';
import { Modal } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ModalCommentList } from './modal-comment-list';

export interface CommentTypes {
  id?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  child_comments?: CommentTypes[];
  body?: string;
  isUpdated?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ICommentProps {
  comment: CommentTypes;
  isLiked?: boolean;
  isPreview?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onReplyClick?: () => void;
  onEdit?: (comment?: CommentTypes) => void;
  onDelete?: (comment?: CommentTypes) => void;
  className?: string;
  isChild?: boolean;
}
const ThreeDotComment = ({
  onDelete,
  onEdit,
  className,
}: {
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useClickAway(componentRef, () => {
    setIsOpen(false);
  });
  return (
    <div
      className={clsx(
        'w-6 h-6 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer justify-center items-center flex rounded relative',
        className,
      )}
      ref={componentRef}
    >
      <div
        className="w-full h-full flex justify-center items-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ThreeDotIcon height={3} width={18} className="rotate-90" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white shadow p-1 rounded z-10 flex-col flex gap-[2px]">
          <div
            className="px-4 hover:bg-black/5 dark:bg-white/5 rounded"
            onClick={() => {
              onEdit?.();
            }}
          >
            Sửa
          </div>
          <div
            className="px-4 hover:bg-black/5 dark:bg-white/5 rounded text-error_l dark:text-error_d"
            onClick={() => {
              onDelete?.();
            }}
          >
            Xoá
          </div>
        </div>
      )}
    </div>
  );
};
const { confirm } = Modal;
const Comment = ({
  comment,
  className,
  isLiked = false,
  isPreview = false,
  isChild,
  onClick,
  onReplyClick,
  onDelete,
}: ICommentProps) => {
  const [currentComment, setCurrentComment] = useState(comment);
  const [liked, setLiked] = useState(isLiked);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const handleEditSubmit = (cmt: CommentTypes) => {
    setIsEdit(false);
    setCurrentComment((prev) => ({ ...prev, body: cmt.body, isUpdated: true }));
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  const handleDelete = () => {
    confirm({
      title: 'Bạn có muốn xoá bình luận này không?',
      onOk() {
        onDelete?.(comment);
        // Call api
      },
      onCancel() {},
    });
  };
  const handleReplySubmit = (cmt: CommentTypes) => {
    setIsReply(false);
    // Call api
    const comments = currentComment.child_comments ? [...currentComment.child_comments] : [];
    comments.unshift(cmt);
    setCurrentComment((prev) => ({ ...prev, child_comments: comments }));
  };
  return (
    <div className={clsx('', className)}>
      <div className="flex items-start">
        <div className={clsx(isChild ? 'scale-75' : '')}>
          <Image
            className={clsx('w-10 h-10 rounded-full mr-3')}
            width={40}
            height={40}
            src={currentComment.user?.avatar || '/images/user-default.jpg'}
            alt={currentComment.user?.name || 'User'}
          />
        </div>
        {!isEdit && (
          <div className="flex comment-content">
            <div>
              <div
                className="bg-background_l_2 dark:bg-background_d p-2 rounded-lg flex flex-col relative"
                onClick={() => {
                  onClick && onClick();
                  console.log('Click');
                }}
              >
                <div className="font-semibold text-sm dark:text-primary_text_d">
                  <Link
                    className="text-black dark:text-primary_text_d flex gap-2"
                    href={'/user/0389619050'}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span>{currentComment.user?.name || 'Nguyễn Văn A'}</span>
                    <span>•</span>
                    <span>NPVN-2019</span>
                  </Link>
                </div>
                <div
                  className="mt-1 text-gray-800 dark:text-primary_text_d font-normal text-sm [&_p]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: currentComment.body || 'No comment available',
                  }}
                ></div>
                {liked && (
                  <div className="absolute -bottom-1 -right-1 bg-white p-[1px] rounded-full w-4 h-4 flex justify-center items-center dark:bg-primary_color_d">
                    <HeartRedIcon />
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-1 ms-1 text-primary_text_l/50 dark:text-primary_text_d/50">
                <button
                  className={clsx(
                    'border-none bg-transparent cursor-pointer text-[12px] font-semibold',
                    liked ? 'text-[#F95E73] dark:text-[#F95E73]' : ' dark:text-primary_text_d',
                  )}
                  onClick={() => {
                    setLiked(!liked);
                  }}
                >
                  Thích
                </button>
                <button
                  className="border-none bg-transparent cursor-pointer text-[12px] font-semibold"
                  onClick={() => {
                    onReplyClick?.();
                    setIsReply(true);
                  }}
                >
                  Trả lời
                </button>
                <span className="text-[12px]">{getTimeAgo(currentComment?.created_at)}</span>
                {currentComment.isUpdated && <span className="text-[12px]">Đã chỉnh sửa</span>}
              </div>
            </div>
            {!isPreview && (
              <div className="ms-1 hidden justify-center items-center flex-col three-dot">
                <ThreeDotComment
                  onEdit={() => {
                    setIsEdit(true);
                    if (isReply) setIsReply(false);
                  }}
                  onDelete={() => {
                    handleDelete();
                  }}
                />
                <div className="w-full h-6"></div>
              </div>
            )}
          </div>
        )}
        {isEdit && (
          <div className="flex flex-col gap-1 flex-1">
            <div className="w-full">
              <CommentInput defaultComment={currentComment} onSendComment={handleEditSubmit} />
            </div>
            <div className="text-right">
              <button
                className="bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 px-3 rounded"
                onClick={handleCancelClick}
              >
                Huỷ
              </button>
            </div>
          </div>
        )}
      </div>
      {isReply && (
        <div className="flex">
          <div className="w-[50px]"></div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="w-full">
              <CommentInput
                onSendComment={(cmt) => {
                  handleReplySubmit(cmt);
                }}
              />
            </div>
            <div className="text-right">
              <button
                className="bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 px-3 rounded"
                onClick={() => {
                  setIsReply(false);
                }}
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="ms-[60px]">
        {currentComment.child_comments?.map((cmt) => (
          <Comment key={cmt.id} comment={cmt} className="mt-3" isChild />
        ))}
      </div>
    </div>
  );
};

const CommentComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="w-full h-full flex items-center gap-2 flex-1 justify-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className="inline-block w-5 h-5">
          <CommentIcon></CommentIcon>
        </span>
        <span>Bình luận</span>
      </div>
      {isOpen && (
        <ModalCommentList
          open
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};

interface CommentInputProps {
  className?: string;
  defaultComment?: CommentTypes;
  onSendComment?: (comment: CommentTypes) => void;
}
const CommentInput = ({ className, onSendComment, defaultComment }: CommentInputProps) => {
  const [comment, setComment] = useState<CommentTypes | undefined>(defaultComment);
  const onchange = (comment: CommentTypes) => {
    setComment(comment);
  };
  return (
    <div className="relative flex justify-around items-center flex-1">
      <div className="flex-1 bg-black/5 dark:bg-[#151E2F] rounded-2xl min-h-10 flex items-center justify-between h-full">
        <div className="max-w-full sm:max-w-[580px] flex-1">
          <TiptapEditor
            content={comment?.body}
            onChange={(content) => {
              onchange({ ...comment, body: content });
            }}
            className="w-full py-[2px] px-3"
            config={{
              limit: 3000,
              placeholder: 'Nhập bình luận...',
            }}
          />
        </div>
        <div className="flex me-2 gap-2">
          <ImageIcon />
          <StickerSelectIcon />
          <SmileyFaceIcon />
        </div>
      </div>
      <button
        className="w-10 h-10 border-none bg-transparent outline-none cursor-pointer flex items-center justify-center"
        disabled={!comment || !comment.body?.trim().replaceAll(/<p>\s*<\/p>/g, '')}
        onClick={() => {
          comment && onSendComment?.(comment);
          setComment(undefined);
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g
            clipPath="url(#clip0_989_55394)"
            className={clsx(
              !comment || !comment.body?.trim().replaceAll(/<p>\s*<\/p>/g, '')
                ? 'fill-black/20 dark:fill-[#daefff]/40'
                : 'fill-green-600',
            )}
          >
            <path d="M22.3314 12.1544C22.3407 11.4377 21.9525 10.779 21.322 10.4332L6.63011 2.3611C5.97206 1.98918 5.19633 2.03487 4.57625 2.4583C3.9448 2.88885 3.6216 3.91379 3.79812 4.65406L5.16967 10.4003C5.31047 10.9896 5.83783 11.4045 6.44453 11.4019L14.6205 11.3765C15.0392 11.3681 15.3788 11.7077 15.3704 12.1263C15.3691 12.5379 15.0345 12.8724 14.6159 12.8808L6.43208 12.8998C5.82538 12.901 5.29544 13.3178 5.15098 13.9079L3.73093 19.677C3.55851 20.3588 3.75509 21.0394 4.23612 21.5204C4.29271 21.577 4.35637 21.6406 4.42008 21.6901C5.04303 22.1707 5.85887 22.232 6.55542 21.8609L21.2971 13.8677C21.9297 13.5323 22.322 12.8711 22.3314 12.1544Z" />
          </g>
          <defs>
            <clipPath id="clip0_989_55394">
              <rect width={24} height={24} fill="red" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};
export { Comment, CommentComponent, CommentInput };
export type { CommentInputProps };
