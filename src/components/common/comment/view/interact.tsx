import { getTimeAgo } from '@/utilities/func.time';
import clsx from 'clsx';
import React from 'react';
import { useMeasure } from 'react-use';
import { CommentType } from '../types';

export type CommentInteractProps = {
  comment: CommentType;
  liked?: boolean;
  onReplyClick?: (comment?: CommentType) => void;
  onLikeClick?: (comment?: CommentType) => void;
};
/** Phần Tương tác like,reply ... */
const CommentInteract: React.FC<CommentInteractProps> = ({ comment, liked, ...props }) => {
  const [rootRef, { width: rootWidth }] = useMeasure<HTMLDivElement>();
  const isMobile = rootWidth < 481;
  return (
    <div ref={rootRef} className="min-h-4 items-center">
      <div
        className={clsx(
          'flex gap-3 text-primary_text_l/50 dark:text-primary_text_d/50',
          isMobile ? 'gap-2' : 'gap-3',
        )}
      >
        <button
          className={clsx(
            'border-none bg-transparent cursor-pointer text-[12px] font-semibold px-0',
            liked ? 'text-[#F95E73] dark:text-[#F95E73]' : ' dark:text-primary_text_d/50',
          )}
          onClick={() => {
            props.onLikeClick?.(comment);
          }}
        >
          Thích
        </button>
        <button
          className="border-none bg-transparent cursor-pointer text-[12px] font-semibold text-nowrap px-0"
          onClick={() => props.onReplyClick?.(comment)}
        >
          Trả lời
        </button>
        <span className="text-[12px]">{getTimeAgo(comment?.created_at)}</span>
        <span className="text-[12px]">Đã chỉnh sửa</span>
      </div>
    </div>
  );
};

export default CommentInteract;
