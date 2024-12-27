import { XIcon } from '@/components/icons';
import Image from 'next/image';
import React from 'react';

export type ImageUploadPreviewProps = {
  url?: string;
  onRemove?: () => void;
};
/** Xem trước ảnh xay khi chọn/dán */
const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ url, onRemove }) => {
  return (
    <div className="flex-1 mb-1">
      <div className="w-24 h-24 relative">
        <Image
          className="w-full h-full object-contain"
          src={url ?? ''}
          alt="image-comment"
          width={0}
          height={0}
          unoptimized
        />
        <div className="absolute top-0 -right-7 w-6 h-6 flex justify-center items-center rounded-full bg-black/5 dark:bg-white/5 cursor-pointer">
          <XIcon
            width={16}
            height={16}
            onClick={() => {
              onRemove?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { ImageUploadPreview };
