/** (Admin) Danh sách chi tiết ảnh/ Thư viện hình ảnh */

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

type MediaListProps = {
  images: string[];
  className?: string;
  selectedImage?: string[];
  onImageClick?: (image: string) => void;
  onImagePress?: (image: string) => void;
  onImageDbClick?: (image: string) => void;
  //   onSelectChange?: (images: string[]) => void;
};
const MediaList: React.FC<MediaListProps> = ({
  images,
  className,
  selectedImage,
  onImagePress,
  onImageClick,
  onImageDbClick,
}) => {
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [pressTimeout, setPressTimeout] = useState<NodeJS.Timeout | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const handleClick = (img: string) => {
    if (pressTimeout) {
      clearTimeout(pressTimeout);
    }
    setClickCount((prev) => ++prev);
    if (clickCount == -1) {
      setClickCount(0);
      return;
    }
    if (clickCount == 0) {
      const clickTime = setTimeout(() => {
        onImageClick?.(img);
        setClickCount(0);
      }, 210);
      setClickTimeout(clickTime);
    }
    if (clickTimeout && clickCount === 1) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setClickCount(0);
      onImageDbClick?.(img);
    }
  };
  const handlePress = (img: string) => {
    setPressTimeout(
      setTimeout(() => {
        onImagePress?.(img);
        setClickCount(-1);
      }, 500),
    );
  };

  return (
    <div className={'w-full grid grid-cols-6 gap-3' + (className ?? '')}>
      {images.map((img) => (
        <div
          key={img}
          className={clsx(
            'relative aspect-square overflow-hidden flex justify-center items-center rounded-lg',
            selectedImage?.includes(img) ? 'outline outline-green-500' : '',
          )}
          onMouseUp={(e) => {
            if (e.button === 0) handleClick(img);
          }}
          onMouseDown={(e) => {
            if (e.button === 0) handlePress(img);
            if (e.button === 2) onImagePress?.(img);
          }}
          onTouchStart={() => {
            handlePress(img);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleClick(img);
          }}
          onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => event.preventDefault()}
        >
          <Image
            src={img}
            alt={img}
            className="w-full h-full object-contain"
            width={300}
            height={300}
          />
          {selectedImage && selectedImage.length > 0 && !selectedImage?.includes(img) && (
            <div className="absolute top-0 left-0 inset-0 bg-white/50"></div>
          )}
          {selectedImage?.includes(img) && (
            <div className="w-[14px] h-[14px] absolute top-2 right-2 flex justify-center items-center rounded-full bg-green-600 border border-solid border-white/50">
              <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaList;
