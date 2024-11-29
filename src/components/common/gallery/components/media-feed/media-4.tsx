import React from 'react';
import { MediaImageFeedProps } from '.';
import MediaView from '../views/media-view';

const Image4: React.FC<MediaImageFeedProps> = ({ media }) => {
  return (
    <>
      <div className="flex w-full gap-[2px]">
        <div className="flex flex-col w-1/2 aspect-2/1 gap-[2px]">
          {media?.slice(0, 2).map((m) => (
            <MediaView className="w-full" key={m.src} src={m.src} type={m.type} aspect="1/1" />
          ))}
        </div>
        <div className="flex flex-col w-1/2 aspect-2/1 gap-[2px]">
          {media?.slice(2).map((m, i) => (
            <MediaView
              className="w-full"
              key={m.src}
              src={m.src}
              numberOverlay={i === 1 ? media.length - 4 : 0}
              visibility={i < 2}
              type={m.type}
              aspect="1/1"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Image4;
