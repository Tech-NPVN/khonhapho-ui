import { Button } from 'antd';
import clsx from 'clsx';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PinItem from './pin-item';

const HomePinComponent = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('w-full bg-white dark:bg-primary_color_d rounded-lg p-4', className)}>
      <div className="w-full flex justify-between items-center">
        <h5 className="text-lg font-bold">Đáng chú ý</h5>
        <Button className="dark:bg-[#151e2f] dark:text-[#daefff] max-sm:hidden" type="default">
          + Ghim bài viết
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
