import { HeartRedIcon } from '@/components/icons';
import clsx from 'clsx';
import { MediaGallery } from '../../gallery';
import { CommentType } from '../types';

const CommentImage = ({ liked, comment }: { liked?: boolean; comment?: CommentType }) => {
  const like_count = comment?.like_count ? comment.like_count + (liked ? 1 : 0) : liked ? 1 : 0;
  return (
    <>
      <div className="w-full flex">
        <div className={clsx('relative', comment?.image ? 'w-[200px]' : 'w-full')}>
          {comment?.image && (
            <div className="rounded-md overflow-hidden">
              <MediaGallery
                mode="grid"
                media={[{ src: comment?.image, type: 'image' }]}
                configs={{
                  grid: {
                    width: 200,
                    maxMediaDisplay: 1,
                    imagePerRow: 1,
                    aspect: 'auto',
                  },
                }}
              />
            </div>
          )}
          <div
            className={clsx(
              'absolute translate-x-1/2 bg-white h-4 min-w-4 rounded-full flex justify-center items-center dark:bg-background_d shadow z-20',
              comment?.image && like_count > 0 ? ' -bottom-1 right-1' : 'hidden',
            )}
          >
            <div className="w-4 h-4">
              <HeartRedIcon width={16} height={16} />
            </div>
            {like_count > 1 && (
              <span className="min-w-4 h-4 justify-center flex">{like_count}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentImage;
