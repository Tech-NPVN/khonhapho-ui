'use client';

import { HeartRedIcon } from '@/components/icons';
import clsx from 'clsx';
import { TextWidthButtonSeeMore } from '../../text';
import { CommentType } from '../types';

type CommentContentProps = {
  comment?: CommentType;
  liked?: boolean;
};

/** */
const CommentContent: React.FC<CommentContentProps> = ({ comment, liked }) => {
  const like_count = comment?.like_count ? comment.like_count + (liked ? 1 : 0) : liked ? 1 : 0;
  return (
    <div className="flex relative">
      <TextWidthButtonSeeMore
        className={clsx('text-sm sm:text-base')}
        htmlString={comment?.text}
        maxLine={3}
      />
      <div
        className={clsx(
          'absolute translate-x-1/2 bg-white h-4 min-w-4 rounded-full flex justify-center items-center dark:bg-background_d shadow z-20',
          comment?.image || like_count < 1 ? 'hidden' : '-bottom-3 -right-1',
        )}
      >
        <div className="w-4 h-4">
          <HeartRedIcon width={16} height={16} />
        </div>
        {like_count > 1 && <span className="min-w-4 h-4 justify-center flex">{like_count}</span>}
      </div>
    </div>
  );
};

export { CommentContent, type CommentContentProps };
