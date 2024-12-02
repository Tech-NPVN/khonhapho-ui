import { TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import { FeedContentProps } from '../type';

export const FeedContent: React.FC<FeedContentProps> = ({ maxLineDisplay, post, className }) => {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <div className="flex w-full items-end flex-wrap">
        <TextSeeMore
          className="text-base dark:text-primary_text_d"
          _html={post?.content}
          maxLine={maxLineDisplay ?? 9}
        />
      </div>
      <div className={'mt-2'}>
        <CopyButton content={post?.content || ''} />
      </div>
    </div>
  );
};
