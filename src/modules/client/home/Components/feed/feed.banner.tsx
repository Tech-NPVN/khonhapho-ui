'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';

const FeedBanner = () => {
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <div className="w-full aspect-[10/4] overflow-hidden sm:rounded-lg relative">
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          waitForTransition: true,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        modules={[Autoplay]}
        loop={true}
        onSlideChange={(swiper: SwiperClass) => {
          setBannerIndex(swiper.realIndex);
        }}
      >
        <SwiperSlide>
          <Image
            className="w-full h-auto max-h-full object-cover"
            width={0}
            height={0}
            src={'/images/banner.png'}
            unoptimized
            alt="???"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-auto max-h-full object-cover"
            width={0}
            height={0}
            src={'/images/banner-2.png'}
            unoptimized
            alt="???"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-auto max-h-full object-cover"
            width={0}
            height={0}
            src={'/images/banner.png'}
            unoptimized
            alt="???"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-auto max-h-full object-cover"
            width={0}
            height={0}
            src={'/images/banner-2.png'}
            unoptimized
            alt="???"
          />
        </SwiperSlide>
      </Swiper>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className={clsx(
                'w-1 h-1 sm:w-3 sm:h-3 rounded-full ',
                index === bannerIndex ? 'bg-white' : 'bg-white/40',
              )}
              onClick={() => {
                swiperRef.current?.swiper.slideTo(index);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export { FeedBanner };
