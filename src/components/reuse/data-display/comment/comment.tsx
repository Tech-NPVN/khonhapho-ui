import { CommentIcon, HeartRedIcon } from '@/components/icons';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ModalCommentList } from './modal-comment-list';
export const getTimeAgo = (date: string): string => {
  const datePublish = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - datePublish.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthDifference = Math.floor(daysDifference / 30);
  const yearDifference = Math.floor(monthDifference / 12);
  if (secondsDifference < 10) return 'Vừa xong';
  else if (yearDifference > 10)
    return `${String(datePublish.getDate()).padStart(2, '0')}/${String(
      datePublish.getMonth() + 1,
    ).padStart(2, '0')}/${datePublish.getFullYear()}`;
  if (yearDifference > 1) {
    return `${yearDifference} năm trước`;
  }
  if (monthDifference > 1) {
    return `${monthDifference} tháng trước`;
  } else if (daysDifference > 1) {
    return `${daysDifference} ngày trước`;
  } else if (hoursDifference > 1) {
    return `${hoursDifference} giờ trước`;
  } else if (minutesDifference > 1) {
    return `${minutesDifference} phút trước`;
  } else {
    return `${secondsDifference} giây trước`;
  }
};
export interface IComment {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  body?: string;
  isUpdated?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ICommentProps {
  comment: IComment;
  isLiked?: boolean;
  isPreview?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onReply?: () => void;
  className?: string;
}
const Comment = ({
  comment,
  className,
  isLiked = false,
  isPreview = false,
  onClick,
  onReply,
}: ICommentProps) => {
  const [liked, setLiked] = useState(isLiked);
  return (
    <div className={clsx('', className)}>
      <div className="flex items-start">
        <div>
          <Image
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
            src={comment.user?.avatar || '/images/user-default.jpg'}
            alt={comment.user?.name || 'User'}
          />
        </div>
        <div>
          <div
            className="bg-background_l_2 dark:bg-background_d p-2 rounded-lg flex flex-col relative"
            onClick={() => {
              onClick && onClick();
              console.log('Click');
            }}
          >
            <div className="font-semibold text-sm flex gap-2 dark:text-primary_text_d">
              <Link
                className="text-black dark:text-primary_text_d"
                href={'/'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {comment.user?.name || 'Nguyễn Văn A'}
              </Link>
              <span>•</span>
              <span className="dark:text-primary_text_d">NPVN-2019</span>
            </div>
            <div className="mt-1 text-gray-800 dark:text-primary_text_d font-normal text-sm">
              {comment.body || 'No comment available'}
            </div>
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
                onReply?.();
              }}
            >
              Trả lời
            </button>
            <span className="text-[12px]">
              {getTimeAgo(comment?.created_at || new Date('2023-01-01').toISOString())}
            </span>
            {comment.isUpdated && <span className="text-[12px]">Đã chỉnh sửa</span>}
          </div>
        </div>
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
export { Comment, CommentComponent };
