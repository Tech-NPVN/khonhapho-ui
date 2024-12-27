import clsx from 'clsx';
import React from 'react';
import { useMeasure } from 'react-use';

type MediaViewOverlayProps = {
  number?: number;
};
const MediaViewOverlay: React.FC<MediaViewOverlayProps> = ({ number = -1 }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  if (number < 1) return null;
  return (
    <div
      ref={ref}
      className={clsx(
        'absolute z-40 flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/60 text-white cursor-default',
        width > 150 ? 'text-5xl' : 'text-3xl',
      )}
    >
      +{number}
    </div>
  );
};

export default MediaViewOverlay;
