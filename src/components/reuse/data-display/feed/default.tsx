import { MediaGallery } from '@/components/common/gallery';
import clsx from 'clsx';
import { AvatarGroup } from './components/avatar';
import { FeedContent } from './components/content';
import { Hashtag } from './components/hashtag';
import { FeedProps } from './type';

export const Default: React.FC<FeedProps> = ({ post, onHashtagClick, threeDotEvents }) => {
  return (
    <>
      <div className="w-full px-3 sm:px-4">
        <div className="w-full flex justify-between items-end relative">
          <AvatarGroup threeDotEvents={threeDotEvents} />
        </div>
        <div>
          <FeedContent post={post} maxLineDisplay={7} />
        </div>
        <div>
          <Hashtag items={post?.tags} onHashtagClick={onHashtagClick} />
        </div>
      </div>
      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <MediaGallery
          mode="feed"
          media={post?.images?.map((img) => ({
            src: img,
            type: 'image',
          }))}
        />
      </div>
    </>
  );
};
