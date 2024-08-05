'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
// 5 ca
import {
  ArrowDownLeftAndUpRightToCenterIcon,
  ArrowUpRightAndDownLeftFromCenterIcon,
  Grid2Icon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useFullscreen } from 'react-use';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
interface ImageGridProps {
  images: string[];
  onImageClick?: (index: number) => void;
}
const Image4 = ({ images, onImageClick }: ImageGridProps) => {
  return (
    <div className="flex flex-wrap gap-[2px]">
      <div className="w-full flex gap-[2px]">
        <div className="flex-1 aspect-square">
          <Image
            onClick={() => {
              onImageClick && onImageClick(0);
            }}
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[0]}
            alt={images[0]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            onClick={() => {
              onImageClick && onImageClick(1);
            }}
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
            onClick={() => {
              onImageClick && onImageClick(2);
            }}
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[2]}
            alt={images[2]}
          />
        </div>
        <div className="flex-1 aspect-square">
          <Image
            onClick={() => {
              onImageClick && onImageClick(3);
            }}
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[3]}
            alt={images[3]}
          />
        </div>
        {images.length > 4 && (
          <div
            className="flex-1 aspect-square relative"
            onClick={() => {
              onImageClick && onImageClick(4);
            }}
          >
            <Image
              className="w-full h-full object-contain z-0"
              width={600}
              height={600}
              src={images[4]}
              alt={images[4]}
            />
            <div
              className={clsx(
                'absolute inset-0 bg-black z-10 opacity-60 flex justify-center items-center',
                images.length <= 5 ? 'hidden' : '',
              )}
            >
              <span className="text-white text-2xl font-bold flex items-center">
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
const Image3 = ({ images, onImageClick }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      <div className="w-8/12 flex">
        <div
          className="w-full aspect-square"
          onClick={() => {
            onImageClick?.(0);
          }}
        >
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
        <div
          className="w-[calc(100%_-_2px)] aspect-square"
          onClick={() => {
            onImageClick?.(1);
          }}
        >
          <Image
            className="w-full h-full object-contain"
            width={600}
            height={600}
            src={images[1]}
            alt={images[2]}
          />
        </div>
        <div
          className="w-[calc(100%_-_2px)] aspect-square"
          onClick={() => {
            onImageClick?.(2);
          }}
        >
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
const Image2 = ({ images, onImageClick }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      {images.map((image, index) => (
        <div
          className="flex-1 aspect-square"
          key={image}
          onClick={() => {
            onImageClick?.(index);
          }}
        >
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
const ImageHorizontally = ({ images, onImageClick }: ImageGridProps) => {
  return (
    <div className="flex gap-[2px]">
      {images.slice(0, 4).map((image, index) => (
        <div
          className="w-1/4 aspect-square relative"
          key={image}
          onClick={() => {
            onImageClick && onImageClick(index);
          }}
        >
          <Image
            className="w-full h-full object-contain"
            width={1200 / 4}
            height={1200 / 4}
            src={image}
            alt={image}
          />
          {index === 3 && images.length > 4 && (
            <div className="absolute inset-0 bg-black/60 z-10 flex justify-center items-center cursor-default">
              <span className="text-white md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl">
                +{images.length - 4}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ZOOM_SETTINGS = { minRatio: 1, maxRatio: 3 };
const ImageSlider = ({
  images,
  index = 1,
  open = false,
  onClose,
}: {
  images: string[];
  index?: number;
  open?: boolean;
  onClose?: () => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isShowThumbs, setIsShowThumbs] = useState<boolean>(images.length > 1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(ZOOM_SETTINGS.minRatio);
  const swiperRef = useRef<SwiperRef | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useFullscreen(rootRef, isFullScreen, {
    onClose: () => {
      setIsFullScreen(false);
    },
  });
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  return (
    <div
      ref={rootRef}
      className={clsx('w-full h-full bg-black fixed top-0 left-0 z-[9999]', open ? '' : 'hidden')}
    >
      <div className="relative w-screen h-screen">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          zoom={ZOOM_SETTINGS}
          className={clsx(
            '[&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-4 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-4 ',
            'transition-all ease-in-out duration-200',
            isShowThumbs ? 'h-[calc(100vh_-_108px)]' : ' h-screen ',
          )}
          centeredSlides
          onZoomChange={(_, zoom) => {
            setScale(zoom);
          }}
          initialSlide={index}
        >
          {images.map((image) => (
            <SwiperSlide key={image} className="h-full w-full flex justify-center">
              <div className="swiper-zoom-container w-full h-full">
                <Image
                  className="w-auto max-w-full max-h-full h-full object-contain"
                  width={0}
                  height={0}
                  src={image}
                  alt={image}
                  quality={100}
                  unoptimized
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
        <div className="absolute top-0 right-1 z-20 flex">
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center hover:bg-white/20 [&_svg]:disabled:fill-white/50"
            onClick={() => {
              swiperRef.current?.swiper.zoom.in(scale - 1);
            }}
            disabled={scale === ZOOM_SETTINGS.minRatio}
          >
            <ZoomOutIcon className="fill-white" width={20} height={20} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center hover:bg-white/20 [&_svg]:disabled:fill-white/50"
            onClick={() => {
              swiperRef.current?.swiper.zoom.in(scale + 1);
            }}
            disabled={scale === ZOOM_SETTINGS.maxRatio}
          >
            <ZoomInIcon className="fill-white" width={20} height={20} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center hover:bg-white/20"
            onClick={() => {
              setIsShowThumbs((prev) => !prev);
            }}
          >
            <Grid2Icon className="fill-white" width={24} height={24} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center hover:bg-white/20"
            onClick={() => {
              setIsFullScreen((prev) => !prev);
            }}
          >
            {isFullScreen ? (
              <ArrowDownLeftAndUpRightToCenterIcon className="fill-white" width={18} height={18} />
            ) : (
              <ArrowUpRightAndDownLeftFromCenterIcon
                className="fill-white"
                width={18}
                height={18}
              />
            )}
          </button>
        </div>
        <div className="absolute top-3 left-3 z-20">
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center rounded-full hover:bg-white/20"
            onClick={() => {
              onClose?.();
            }}
          >
            <XIcon className="fill-white" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
const ImageGrid = ({ images, isWarehouse = false }: ImageGridProps & { isWarehouse?: boolean }) => {
  const router = useRouter();
  const [isHorizontally, seIsHorizontally] = useState<boolean>(isWarehouse);
  const [isShowSlider, setIsShowSlider] = useState<boolean>(false);
  const [imageShowIndex, setImageShowIndex] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleImageClick = (index: number = 0) => {
    setImageShowIndex(index);
    setIsShowSlider(true);
    router.push(location.href + '#gallery');
  };
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== '#gallery') setIsShowSlider(false);
    };
    if (window.location.hash === '#gallery') router.replace(location.href.replace('#gallery', ''));
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [router]);
  useEffect(() => {
    const handleResize = () => {
      if (rootRef.current?.clientWidth && rootRef.current?.clientWidth > 640) {
        seIsHorizontally(true);
      } else if (!isWarehouse) seIsHorizontally(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isWarehouse, rootRef]);
  return (
    <div ref={rootRef} className="w-full">
      {!isHorizontally && images.length >= 4 && (
        <Image4 images={images} onImageClick={handleImageClick} />
      )}
      {!isHorizontally && images.length == 3 && (
        <Image3 images={images} onImageClick={handleImageClick} />
      )}
      {!isHorizontally && images.length <= 2 && (
        <Image2 images={images} onImageClick={handleImageClick} />
      )}
      {isHorizontally && <ImageHorizontally images={images} onImageClick={handleImageClick} />}
      {isShowSlider && (
        <ImageSlider
          images={images}
          open={true}
          index={imageShowIndex}
          onClose={() => {
            router.back();
            setIsShowSlider(false);
          }}
        />
      )}
    </div>
  );
};

export default ImageGrid;
export type { ImageGridProps };
