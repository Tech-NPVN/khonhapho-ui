'use client';

import { useElementSize } from '@/hooks/use-div-width';
import clsx from 'clsx';
import React, { DragEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { useIdle, useSlider } from 'react-use';
import PlayButton from './play-button';

type VideoProps = {
  src?: string;
};
const Video: React.FC<VideoProps> = React.memo(({ src }) => {
  const isIdle = useIdle(5000);
  const [isPlaying, setIsPlaying] = useState(false);
  const processDivRef = useRef<HTMLDivElement>(null);
  const [processWidth, setProcessWidth] = useState(0);
  const { ref: videoRef, width: videoWidth } = useElementSize<HTMLVideoElement>();

  const { isSliding } = useSlider(processDivRef, {
    onScrub(value) {
      if (videoRef.current) videoRef.current.currentTime = value * videoRef.current.duration;
      setProcessWidth(value * 100);
    },
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const updateCurrentTime = () => {
      if (processDivRef.current) {
        const processWidth = (video.currentTime / video.duration) * 100;
        if (video.currentTime === video.duration) setIsPlaying(false);
        setProcessWidth(processWidth);
      }
    };

    video.addEventListener('timeupdate', updateCurrentTime);
    return () => {
      video.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [videoRef]);
  return (
    <div
      className={clsx(
        'relative w-full h-full flex justify-center items-center',
        isSliding ? 'pointer-events-none' : '',
      )}
    >
      <video
        ref={videoRef}
        className="w-auto h-auto max-w-full max-h-full object-contain select-none"
      >
        <source src={src} />
      </video>
      <button
        className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 pointer-events-auto bg-transparent border-none"
        onClick={() => togglePlay()}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.stopPropagation()}
        onTouchMove={(e: TouchEvent) => e.stopPropagation()}
      >
        {isPlaying ? <PlayButton pause invisible={isIdle} /> : <PlayButton />}
      </button>
      <div className="absolute bottom-3 px-3" onClick={(e) => e.stopPropagation()}>
        <div
          ref={processDivRef}
          className={`relative h-3 cursor-pointer mx-3 ${isIdle && isPlaying ? 'opacity-0' : ''}`}
          style={{ width: videoWidth - 24 + 'px' }}
          onDragStart={(e: DragEvent) => e.stopPropagation()}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
          onTouchMove={(e: TouchEvent) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="left absolute top-1/2 -translate-y-1/2 h-1 bg-white/40"
            style={{ width: videoWidth - 24 + 'px' }}
            onClick={(e) => e.stopPropagation()}
          ></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-white"
            style={{
              width: processWidth + '%',
            }}
            onClick={(e) => e.stopPropagation()}
          ></div>
          <div
            className="absolute w-3 h-3 top-0 rounded-full cursor-pointer"
            style={{
              left: `${processWidth}%`,
              backgroundColor: isSliding ? 'white' : 'transparent',
            }}
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      </div>
    </div>
  );
});

Video.displayName = 'Video';
export default Video;
