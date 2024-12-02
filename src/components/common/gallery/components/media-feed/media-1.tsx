import React from 'react';
import { MediaImageFeedProps } from '.';
import MediaView from '../views/media-view';

const Image1: React.FC<MediaImageFeedProps> = ({ media }) => {
  return (
    <>
      {media?.map((m, i) => (
        <MediaView
          className="w-full"
          key={m.src}
          src={m.src}
          numberOverlay={media.length - 1}
          visibility={i === 0}
          type={m.type}
        />
      ))}
    </>
  );
};

export default Image1;
