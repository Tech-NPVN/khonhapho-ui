import React from 'react';
import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MediaView, { MediaViewProps } from '../views/media-view';

export type MediaSliderProps = {
  media?: MediaViewProps[];
};

const MediaSlider: React.FC<MediaSliderProps> = ({ media }) => {
  return (
    <div className="w-full h-full">
      <Swiper
        spaceBetween={3}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className={
          '[&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-1 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-1 [&_.swiper-button-next:after]:text-[32px] [&_.swiper-button-prev:after]:text-[32px] transition-all ease-in-out duration-200 h-full warehouse-slider-p'
        }
        centeredSlides
      >
        {media?.map((m, i) => (
          <SwiperSlide key={m.src} className="h-full w-full flex justify-center">
            <MediaView
              key={m.src}
              src={m.src}
              type={m.type}
              aspect="auto"
              className="w-full max-h-none [&_img]:max-w-none [&_img]:h-full [&_img]:max-h-none [&_video]:max-w-none [&_video]:h-full [&_video]:max-h-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaSlider;
