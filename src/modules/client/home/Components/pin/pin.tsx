'use client';

import { Button, Skeleton } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PinItem from './pin-item';

const HomePinComponent = ({ className }: { className?: string }) => {
  const [loading, SetLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      SetLoading(false);
    }, 100);
  }, []);
  if (loading)
    return (
      <div className="w-full bg-white dark:bg-primary_color_d rounded-lg p-4">
        <Skeleton.Button active className="w-[98px]"></Skeleton.Button>
        <div className="flex gap-3">
          <div className="mt-8 w-[250px]">
            <div className="flex gap-3">
              <Skeleton.Avatar size={52} active />
              <Skeleton paragraph={{ rows: 2 }} title={false} active />
            </div>
            <div className="mt-2">
              <Skeleton paragraph={{ rows: 3 }} title={false} active />
              <Skeleton.Image className="w-full h-36" active />
            </div>
          </div>
          <div className="mt-8 w-[250px] max-sm:hidden">
            <div className="flex gap-3">
              <Skeleton.Avatar size={52} active />
              <Skeleton paragraph={{ rows: 2 }} title={false} active />
            </div>
            <div className="mt-2">
              <Skeleton paragraph={{ rows: 3 }} title={false} active />
              <Skeleton.Image className="w-full h-36" active />
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className={clsx('w-full bg-white dark:bg-primary_color_d rounded-lg p-4', className)}>
      <div className="w-full flex justify-between items-center">
        <h5 className="text-lg font-bold">Đáng chú ý</h5>
        <Button
          className="dark:bg-[#151e2f] dark:text-[#daefff] max-sm:hidden flex justify-center"
          type="default"
        >
          <span>+</span>
          <span>Ghim bài viết</span>
        </Button>
      </div>
      <div className="overflow-hidden mt-4">
        <div className="w-full">
          <Swiper
            className="w-full"
            spaceBetween={16}
            freeMode={true}
            loop={false}
            slidesPerView={'auto'}
          >
            <SwiperSlide className="h-[320px] w-[250px]">
              <PinItem></PinItem>
            </SwiperSlide>
            <SwiperSlide className="h-[320px] w-[250px]">
              <PinItem></PinItem>
            </SwiperSlide>
            <SwiperSlide className="h-[320px] w-[250px]">
              <PinItem></PinItem>
            </SwiperSlide>
            <SwiperSlide className="h-[320px] w-[250px]">
              <PinItem></PinItem>
            </SwiperSlide>
            <SwiperSlide className="h-[320px] w-[250px]">
              <PinItem></PinItem>
            </SwiperSlide>
            <SwiperSlide className="w-[2px]">
              <div></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomePinComponent;
