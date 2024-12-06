'use client';

import { UploadInput } from '@/components/common';
import { ArrowRightIcon } from '@/components/icons';
import { RequiredSymbolLabel } from '@/components/reuse/data-entry/required-symbol-label';
import { IMAGE_ACCEPTED } from '@/constants/data';
import useUpload from '@/hooks/use-upload';
import { Button, Input } from 'antd';
import Link from 'next/link';
import React from 'react';

type PhotoGalleryFormProps = {
  id?: string;
};
/** (Admin) 'Index' Thêm/cập nhật thư viện hình ảnh */
const PhotoGalleryForm: React.FC<PhotoGalleryFormProps> = ({ id }) => {
  const imagesUpload = useUpload();
  return (
    <div className="m-4 ml-0 bg-white rounded-lg p-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Link href={'/admin/media/photo-gallery'}>
            <Button className="-ms-3 bg-transparent border-none hover:bg-black/5">
              <ArrowRightIcon className="rotate-180 scale-125" />
            </Button>
          </Link>
          <span className="text-lg">{id ? 'Cập nhật thư viện' : 'Thêm thư viện hình ảnh mới'}</span>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className="flex items-center">
          <label className="min-w-[120px]" htmlFor="input-name">
            <RequiredSymbolLabel />
            Tên album
          </label>
          <Input
            className="h-10 sm:w-[400px]"
            type="text"
            id="input-name"
            placeholder="Nhật tên album"
          />
        </div>
        <div className="flex">
          <div className="me-3">Ảnh</div>
          <div className="flex dark:[&_.ant-upload.ant-upload-select]:!bg-white/10">
            <UploadInput {...imagesUpload} maxCount={999} multiple accept={IMAGE_ACCEPTED} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryForm;
