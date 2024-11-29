import React from 'react';
import { MediaImageFeedProps } from '.';
import MediaView from '../views/media-view';

const Image2: React.FC<MediaImageFeedProps> = ({ media }) => {
  return (
    <>
      <div className="flex w-full gap-[2px]">
        {media?.map((m, i) => (
          <MediaView
            className="w-1/2"
            key={m.src}
            src={m.src}
            numberOverlay={i == 1 ? media.length - 2 : 0}
            visibility={i < 2}
            type={m.type}
            aspect="1/1"
          />
        ))}
      </div>
    </>
  );
};

export default Image2;
