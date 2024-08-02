'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
// 5 ca
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
interface ImageGridProps {
  images: string[];
}
const Image4 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex flex-wrap gap-[2px]">
      <div className="w-full flex gap-[2px]">
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[0]}
            alt={images[0]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[1]}
            alt={images[1]}
          />
        </div>
      </div>
      <div className="w-full flex gap-[2px]">
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={400}
            height={400}
            src={images[2]}
            alt={images[2]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={400}
            height={400}
            src={images[3]}
            alt={images[3]}
          />
        </div>
        {images.length > 4 && (
          <div className="flex-1 aspect-square relative">
            <Image
              className="w-full h-full object-contain z-0"
              width={400}
              height={400}
              src={images[4]}
              alt={images[4]}
            />
            <div
              className={clsx(
                'absolute inset-0 bg-black z-10 opacity-60 flex justify-center items-center',
                images.length <= 5 ? 'hidden' : '',
              )}
            >
              <span className="text-white text-3xl font-bold flex items-center">
                <span className="mt-1 h-5 w-5 flex justify-center items-center">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </span>
                <span>{images.length - 5}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const Image3 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      <div className="w-8/12 flex">
        <div className="w-full aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={1000}
            height={1000}
            src={images[0]}
            alt={images[0]}
          />
        </div>
      </div>
      <div className="w-4/12 flex flex-wrap overflow-hidden gap-[2px]">
        <div className="w-[calc(100%_-_2px)] aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[1]}
            alt={images[2]}
          />
        </div>
        <div className="w-[calc(100%_-_2px)] aspect-square">
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[2]}
            alt={images[2]}
          />
        </div>
      </div>
    </div>
  );
};
const Image2 = ({ images }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      {images.map((image) => (
        <div className="flex-1 aspect-square" key={image}>
          <Image
            className="w-full h-full object-contain"
            width={1200 / images.length}
            height={1200 / images.length}
            src={image}
            alt={image}
          />
        </div>
      ))}
    </div>
  );
};
const ImageHorizontally = ({ images }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      {images.slice(0, 4).map((image, index) => (
        <div className="w-1/4 aspect-square relative" key={image}>
          <Image
            className="w-full h-full object-contain"
            width={1200 / 4}
            height={1200 / 4}
            src={image}
            alt={image}
          />
          {index === 3 && images.length > 4 && (
            <div className="absolute inset-0 bg-black/60 z-10 flex justify-center items-center cursor-default">
              <span className="text-white text-6xl">+{images.length - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ImageSlider = ({
  images,
  index = 0,
}: {
  images: string[];
  index?: number;
  open?: boolean;
  onClose?: () => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isShowThumbs, setIsShowThumbs] = useState<boolean>(images.length > 1);
  const swiperRef = useRef<SwiperRef | null>(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  console.log(isShowThumbs);

  return (
    <div className="w-full h-full bg-black fixed top-0 left-0 z-[9999]">
      <div className="relative w-screen h-screen">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          zoom={{ minRatio: 1, maxRatio: 2 }}
          className={clsx(
            '[&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-4 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-4 ',
            'transition-all ease-in-out duration-200',
            isShowThumbs ? 'h-[calc(100vh_-_108px)]' : ' h-screen ',
          )}
          centeredSlides
        >
          {images.map((image) => (
            <SwiperSlide key={image} className="h-full w-full flex justify-center">
              <div className="swiper-zoom-container w-full h-full">
                <Image
                  className="w-auto max-w-full max-h-full h-full object-contain"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={image}
                  alt={image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={clsx(
            'w-full absolute h-[100px] bottom-1 mx-auto my-0 flex justify-center items-center',
            'transition-all ease-in-out duration-200',
            isShowThumbs ? '' : 'translate-y-[108px]',
          )}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-[600px] [&_.swiper-slide-thumb-active_.bg]:!opacity-0"
            slidesPerView={images.length > 6 ? 6 : images.length}
            style={{ width: `${images.length > 6 ? 6 : images.length}00px` }}
          >
            {images.map((image) => (
              <SwiperSlide
                key={image}
                className="h-[100px] w-[100px] bg-black/30 flex justify-center items-center rounded-lg overflow-hidden relative"
              >
                <Image
                  className="h-full w-auto object-contain"
                  width={120}
                  height={120}
                  src={image}
                  alt={image}
                />
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/60 z-10 bg"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute top-0 right-0 z-20">
          <button
            onClick={() => {
              setIsShowThumbs((prev) => !prev);
            }}
          >
            Thumbs
          </button>
        </div>
      </div>
    </div>
  );
};
const ImageGrid = ({ images, isWarehouse = true }: ImageGridProps & { isWarehouse?: boolean }) => {
  const [isHorizontally, seIsHorizontally] = useState(isWarehouse);
  return (
    <>
      {!isHorizontally && images.length >= 4 && <Image4 images={images} />}
      {!isHorizontally && images.length == 3 && <Image3 images={images} />}
      {!isHorizontally && images.length <= 2 && <Image2 images={images} />}
      {isHorizontally && <ImageHorizontally images={images} />}
      {/* <ImageSlider images={images} open={false} /> */}
    </>
  );
};

export default ImageGrid;
export type { ImageGridProps };
