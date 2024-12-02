import React from 'react';
import { AspectRatio } from '../views/image-view';
import MediaView, { MediaViewProps } from '../views/media-view';
import { convertImageClassName, convertRootClass } from './handle-css';

export type MediaImageGridProps = {
  gap?: number;
  wrap?: boolean;
  width?: number;
  height?: number;
  className?: string;
  aspect?: AspectRatio;
  imagePerRow?: number;
  imageClassName?: string;
  maxMediaDisplay?: number;
  media?: MediaViewProps[];
};

const MediaImageGrid: React.FC<MediaImageGridProps> = React.memo(
  ({
    width,
    height,
    gap = 2,
    media = [],
    wrap = true,
    aspect = '1/1',
    className = '',
    imagePerRow = -1,
    imageClassName = '',
    maxMediaDisplay = -1,
  }) => {
    const getNumberOverlay = (index: number, maxNumber: number) => {
      if (index == maxNumber - 1 && maxMediaDisplay >= 0) return media.length - maxMediaDisplay;
      return 0;
    };

    return (
      <>
        <div
          className={convertRootClass({
            root: className,
            gap,
            wrap,
            imagePerRow,
          })}
          style={{
            gridTemplateColumns:
              imagePerRow > 0 ? `repeat(${imagePerRow}, minmax(0, 1fr))` : 'auto',
            gap: gap + 'px',
          }}
        >
          {media?.map((m, i) => (
            <MediaView
              className={imageClassName + convertImageClassName({ width, height })}
              key={m.src}
              src={m.src}
              type={m.type}
              aspect={aspect}
              numberOverlay={getNumberOverlay(i, maxMediaDisplay)}
              visibility={i < maxMediaDisplay || maxMediaDisplay === -1}
            />
          ))}
        </div>
      </>
    );
  },
);
MediaImageGrid.displayName = 'MediaImageGrid';

export default MediaImageGrid;
