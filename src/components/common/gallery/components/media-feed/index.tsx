import React from 'react';
import { MediaViewProps } from '../views/media-view';
import Image1 from './media-1';
import Image2 from './media-2';
import Image3 from './media-3';
import Image4 from './media-4';
import Image5 from './media-5';

export type MediaImageFeedProps = {
  media?: MediaViewProps[];
  className?: string;
  maxMediaDisplay?: 1 | 2 | 3 | 4 | 5;
};

/**
 * Thư viện Media dạng feed
 */
const MediaImageFeed: React.FC<MediaImageFeedProps> = React.memo(
  ({ media = [], maxMediaDisplay = 5, className }) => {
    if (maxMediaDisplay === 1 || media.length === 1)
      return <Image1 media={media} className={className} />;
    if (maxMediaDisplay === 2 || media.length === 2)
      return <Image2 media={media} className={className} />;
    if (maxMediaDisplay === 3 || media.length === 3)
      return <Image3 media={media} className={className} />;
    if (maxMediaDisplay === 4 || media.length === 4)
      return <Image4 media={media} className={className} />;
    if (maxMediaDisplay === 5) return <Image5 media={media} className={className} />;
  },
);

MediaImageFeed.displayName = 'MediaImageFeed';
export default MediaImageFeed;
