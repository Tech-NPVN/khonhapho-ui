'use client';

import { Palette } from 'color-thief-react';
import Image from 'next/image';
import React from 'react';
import { PhotoView } from 'react-photo-view';
import { BLUR_DATA_URL } from './image-blur';

export type AspectRatio = '1/1' | '16/9' | '9/16' | 'auto';

export type ImageViewProps = {
  src?: string;
  className?: string;
  aspect?: AspectRatio;
  visibility?: boolean;
  numberOverlay?: number;
};

// Ảnh logo hiện tại

const ImageView: React.FC<ImageViewProps> = ({
  src,
  aspect = 'square',
  className = '',
  visibility = true,
  numberOverlay = 0,
}) => {
  return (
    <PhotoView key={src} src={src}>
      {visibility ? (
        <div className={`overflow-hidden relative flex justify-center items-center ${className}`}>
          <Palette src={src ?? ''} format="hex">
            {({ data }) => {
              return (
                <div
                  className="absolute z-0 top-0 left-0 right-0 bottom-0"
                  style={{
                    backgroundColor:
                      data?.[0] === '#2c2c2c' && data?.[1] === '#e7e7e7' ? data?.[1] : data?.[0],
                  }}
                ></div>
              );
            }}
          </Palette>
          <Image
            className="w-full max-w-[600px] max-h-[600px] h-full object-cover relative z-10"
            style={{
              aspectRatio: aspect,
            }}
            width={0}
            height={0}
            src={src ?? 'error'}
            alt={src ?? 'error'}
            unoptimized
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          {numberOverlay > 0 && (
            <div className="absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/60 text-white text-5xl cursor-default z-20">
              +{numberOverlay}
            </div>
          )}
        </div>
      ) : undefined}
    </PhotoView>
  );
};

export default ImageView;
