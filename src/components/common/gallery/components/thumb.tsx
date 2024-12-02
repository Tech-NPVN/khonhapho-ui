import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useMeasure } from 'react-use';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { MediaViewProps } from './views/media-view';
import PlayButton from './views/play-button';

type GalleryThumbnailProps = {
  index?: number;
  media?: MediaViewProps[];
  onThumbnailClick?: (index: number) => void;
};
const GalleryThumbnail: React.FC<GalleryThumbnailProps> = ({
  media = [],
  index,
  onThumbnailClick,
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    swiperRef?.current?.swiper.slideTo(index ?? 0);
  }, [index]);
  const isMobile = width < 481;

  return (
    <>
      <div ref={ref} className="w-full flex justify-center items-center overflow-hidden">
        <Swiper
          freeMode
          //   centeredSlides
          ref={swiperRef}
          spaceBetween={5}
          modules={[FreeMode]}
          slidesPerView={'auto'}
          className="px-3 [&_.swiper-slide-thumb-active_.bg]:!opacity-0"
        >
          {media?.map((me, i) => (
            <SwiperSlide
              key={me.src}
              className="bg-black/30 flex justify-center items-center rounded-lg overflow-hidden relative"
              style={{
                width: isMobile ? '80px' : '105px',
                height: isMobile ? '80px' : '105px',
              }}
              onClick={() => {
                onThumbnailClick?.(i);
              }}
            >
              <div className="flex-1 aspect-square relative overflow-hidden">
                {me.type === 'image' && (
                  <Image
                    src={me.src ?? ''}
                    alt={me.src ?? ''}
                    width={120}
                    height={120}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
                {me.type === 'video' && (
                  <>
                    <video src={me.src} className="w-full h-full object-cover"></video>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <PlayButton />
                    </div>
                  </>
                )}
              </div>
              {index != i && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/60 z-10 bg"></div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default GalleryThumbnail;
