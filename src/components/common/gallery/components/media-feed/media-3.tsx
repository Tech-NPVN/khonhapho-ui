import React from 'react';
import { MediaImageFeedProps } from '.';
import MediaView from '../views/media-view';

const Image3: React.FC<MediaImageFeedProps> = ({ media }) => {
  return (
    <>
      <div className="flex w-full">
        <div className="w-8/12 aspect-square pe-[1px]">
          {media?.[1] && (
            <MediaView
              className="w-full max-w-[600px]"
              key={media?.[1]?.src}
              src={media?.[1]?.src}
              type={media?.[1]?.type}
              aspect="1/1"
            />
          )}
        </div>
        <div className="flex flex-col w-4/12 aspect-2/1 gap-[3px] ps-[2px]">
          {media?.slice(1).map((m, i) => (
            <MediaView
              className="w-full  max-w-[300px]"
              key={m.src}
              src={m.src}
              numberOverlay={i === 1 ? media.length - 3 : 0}
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

export default Image3;
