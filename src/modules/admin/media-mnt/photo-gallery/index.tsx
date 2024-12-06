'use client';

import { AddIcon } from '@/components/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import GalleryList from './gallery-list';
import SwitchDisplayButton, { SwitchDisplayButtonProps } from './switch-button';

/**
 * (Admin) Thư viện hình ảnh
 */
const PhotoGalleryIndex: React.FC = () => {
  const [mediaDisplay, setMediaDisplay] = useState<SwitchDisplayButtonProps['value'] | null>(null);
  useEffect(() => {
    const display = localStorage.getItem('admin/media/photo-gallery');
    if (display) setMediaDisplay(display as SwitchDisplayButtonProps['value']);
    else setMediaDisplay('grid');
  }, []);
  return (
    <div className="bg-white mt-4 sm:rounded-lg pt-6 p-2 sm:p-4 sm:mx-4 lg:ms-0">
      <div className="flex justify-between flex-wrap">
        <div className="uppercase font-semibold text-xl">Thư viện hình ảnh</div>
        <div className="flex sm:gap-4 gap-2">
          {mediaDisplay && (
            <SwitchDisplayButton
              className="h-9"
              value={mediaDisplay}
              onChange={(value) => {
                setMediaDisplay(value);
              }}
            />
          )}
          <Button className="h-9 rounded-xl" type="primary" icon={<AddIcon />}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="mt-4">{mediaDisplay && <GalleryList display={mediaDisplay} />}</div>
    </div>
  );
};

export default PhotoGalleryIndex;
