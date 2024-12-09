'use client';

import MediaOverlay from '@/components/common/gallery/components/overlay';
import { ArrowRightIcon } from '@/components/icons';
import { Button } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { PhotoSlider } from 'react-photo-view';

import './custom.css';
import MediaList from './media-list';
const imagesDemo = [
  '/images/post-1.jpeg',
  '/images/post-2.jpeg',
  '/images/post-3.jpeg',
  '/images/post-4.jpeg',
  '/images/post-5.jpeg',
];
const ViewMediaIndex: React.FC<{ id: string }> = ({ id }) => {
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(-1);
  // Lỗi ở state này
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleClickImage = (image: string) => {
    if (selectedImages.length > 0) {
      if (selectedImages.find((img) => image == img))
        setSelectedImages(selectedImages.filter((img) => img !== image));
      else setSelectedImages((prev) => [...prev, image]);
    } else {
      setImageIndex(imagesDemo.findIndex((img) => image === img));
      setOpenSlider(true);
    }
  };
  const handleImagePress = (image: string) => {
    if (selectedImages.length === 0) setSelectedImages([image]);
  };
  const handleImageDBClick = (image: string) => {
    if (selectedImages.length != 0) {
      setImageIndex(imagesDemo.findIndex((img) => image === img));
      setOpenSlider(true);
    }
  };

  return (
    <div className="m-4 ml-0 bg-white rounded-lg p-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Link href={'/admin/media/photo-gallery'}>
            <Button className="-ms-3 bg-transparent border-none hover:bg-black/5">
              <ArrowRightIcon className="rotate-180 scale-125" />
            </Button>
          </Link>
          <span className="text-lg">Ngày hội thể thao 20/10</span>
        </div>
        <div className="flex gap-1 items-center">
          <span>Đã chọn: {selectedImages.length}</span>
          <Button
            onClick={() => {
              setSelectedImages([]);
            }}
          >
            Bỏ chọn tất cả
          </Button>
          <Button
            onClick={() => {
              setSelectedImages(imagesDemo);
            }}
          >
            Chọn tất cả
          </Button>
        </div>
      </div>
      <div className="w-full mt-3">
        <MediaList
          images={imagesDemo}
          selectedImage={selectedImages}
          onImageClick={handleClickImage}
          onImageDbClick={handleImageDBClick}
          onImagePress={handleImagePress}
        />
      </div>
      <PhotoSlider
        speed={() => 400}
        maskClosable={false} // bỏ ấn nền đen thì đóng
        bannerVisible={false} // ẩn các nút mặc định
        className="select-none media-fullscreen-selector "
        photoClassName="photo-view__content"
        overlayRender={({ images: imgs, ...props }) => {
          return (
            <MediaOverlay
              {...props}
              index={imageIndex}
              onIndexChange={(i) => {
                setImageIndex(i);
              }}
              media={imagesDemo.map((image) => ({
                src: image,
                type: 'image',
                time: new Date().toISOString(),
              }))}
            />
          );
        }}
        onIndexChange={(index) => {
          setImageIndex(index);
        }}
        afterClose={() => {
          console.log('afterClose');
        }}
        // maskClassName="opacity-50"
        images={imagesDemo.map((image) => ({
          src: image,
          key: image,
        }))}
        index={imageIndex}
        onClose={() => {
          setOpenSlider(false);
        }}
        visible={openSlider}
      />
    </div>
  );
};

export default ViewMediaIndex;
