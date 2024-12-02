'use client';
import React from 'react';
import { PhotoView } from 'react-photo-view';
import { useWindowSize } from 'react-use';
import { AspectRatio } from './image-view';
import PlayButton from './play-button';
import Video from './video';

type VideoViewProps = {
  src?: string;
  className?: string;
  visibility?: boolean;
  aspect?: AspectRatio;
  numberOverlay?: number;
};
const VideoView: React.FC<VideoViewProps> = React.memo(
  ({ src, visibility = true, numberOverlay = 0, aspect, className }) => {
    const { width, height } = useWindowSize();
    return (
      <>
        <PhotoView
          width={width}
          height={height}
          key={src ?? 'video-id'}
          render={({ attrs }) => {
            return (
              <div
                {...attrs}
                style={{
                  ...attrs.style,
                  transform: attrs.style?.transform || 'none',
                }}
                className="flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Video src={src} />
              </div>
            );
          }}
        >
          {visibility ? (
            <div
              className={
                'aspect-square overflow-hidden relative max-h-[600px] bg-black/10 flex justify-center items-center w-full ' +
                className
              }
            >
              <video className="w-full max-h-[600px]" src={src}></video>
              <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-30">
                <PlayButton />
              </div>
              {numberOverlay > 0 && (
                <div className="absolute z-40 flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/60 text-white text-5xl cursor-default">
                  +{numberOverlay}
                </div>
              )}
            </div>
          ) : undefined}
        </PhotoView>
      </>
    );
  },
);
VideoView.displayName = 'VideoView';
export default VideoView;
