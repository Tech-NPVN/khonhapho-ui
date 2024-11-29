import React from 'react';
import { MediaImageFeedProps } from '.';
import MediaView from '../views/media-view';

const Image5: React.FC<MediaImageFeedProps> = ({ media }) => {
  return (
    <>
      <div className="flex w-full flex-col gap-[2px]">
        <div className="flex w-full aspect-2/1 gap-[2px]">
          {media?.slice(0, 2).map((m) => (
            <MediaView className="w-1/2" key={m.src} src={m.src} type={m.type} aspect="1/1" />
          ))}
        </div>
        <div className="flex w-full aspect-2/1 gap-[2px]">
          {media?.slice(2).map((m, i) => (
            <MediaView
              className="w-1/3"
              key={m.src}
              src={m.src}
              numberOverlay={i === 2 ? media.length - 5 : 0}
              visibility={i < 3}
              type={m.type}
              aspect="1/1"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Image5;
