'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
    <div className="flex flex-wrap gap-[1px] sm:gap-[2px]">
      <div className="w-full flex gap-[1px] sm:gap-[2px]">
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
      <div className="w-full flex gap-[1px] sm:gap-[2px]">
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
    <div className="flex gap-[1px] sm:gap-[2px]">
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
      <div className="w-4/12 flex flex-wrap overflow-hidden gap-[1px] sm:gap-[2px]">
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
    <div className="flex gap-[1px] sm:gap-[2px]">
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
    <div className="flex gap-[1px] sm:gap-[2px]">
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
const VideoTag = ({
  video,
  play,
  onClick,
}: {
  video: string;
  play?: boolean;
  onClick?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const processDivRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const processInputRef = useRef<HTMLInputElement>(null);
  const idSetTimeoutRef = useRef<NodeJS.Timeout>();
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isHiddenButton, setIsHiddenButton] = useState<boolean>(false);
  useEffect(() => {
    setInterval(() => {
      const currentTime = videoRef.current?.currentTime || 0;
      const duration = videoRef.current?.duration || 1;
      const present = (currentTime / duration) * 100;
      processInputRef?.current?.setAttribute('value', (present * 10).toString());
      processDivRef.current?.setAttribute('style', `width:${present}%`);
      if (videoRef.current?.ended) {
        setIsPlay(false);
        processRef.current?.classList.add('hidden');
      }
      if (videoRef.current?.paused) setIsPlay(false);
      if (currentTime > 0 && present < 100) processRef.current?.classList.remove('hidden');
    }, 100);
    videoRef.current?.addEventListener('mousemove', () => {
      if (idSetTimeoutRef.current) clearTimeout(idSetTimeoutRef.current);
      idSetTimeoutRef.current = setTimeout(() => {
        setIsHiddenButton(true);
      }, 3000);
      setIsHiddenButton(false);
    });
  }, []);

  useEffect(() => {
    if (play && videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlay(true);
    } else {
      videoRef.current?.pause();
      setIsPlay(false);
    }
  }, [play]);
  const handleClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlay(true);
      return;
    }
    videoRef.current?.pause();
    setIsPlay(false);
  };

  return (
    <div className="w-full h-full relative">
      <video
        ref={videoRef}
        src={video}
        className="w-full h-full select-none"
        onClick={() => {
          if (onClick) onClick();
          else handleClick();
        }}
      ></video>
      <div
        ref={processRef}
        className="w-[calc(100%_-_20px)] h-[3px] my-0 mx-auto rounded bg-white/20 absolute bottom-2 left-0 right-0 hidden"
      >
        <div className="relative w-full h-full">
          <div className="w-full h-full absolute top-0">
            <div ref={processDivRef} className="h-full rounded bg-white process-div"></div>
          </div>
          <input
            ref={processInputRef}
            type="range"
            className="process-input w-full appearance-none bg-transparent absolute top-0 left-0 right-0 h-[3px] slider-video-custom"
            min={0}
            max={1000}
            step={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value);
              const time = ((videoRef.current?.duration || 0) * value) / 1000;
              if (videoRef.current !== null) {
                videoRef.current.currentTime = time;
              }
            }}
          ></input>
        </div>
      </div>
      <div
        className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
        onClick={() => {
          handleClick();
        }}
      >
        {!isPlay ? (
          <div className="w-full h-full flex justify-center items-center cursor-pointer bg-black/20 rounded-full">
            <svg width={22} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </div>
        ) : (
          !isHiddenButton && (
            <div className="w-full h-full flex justify-center items-center cursor-pointer bg-black/20 rounded-full">
              <svg width={22} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
              </svg>
            </div>
          )
        )}
      </div>
    </div>
  );
};
const ZOOM_SETTINGS = { minRatio: 1, maxRatio: 3 };
export interface SlideProps {
  videos?: string[];
  images?: string[];
  index?: number;
  open?: boolean;
  onClose?: () => void;
}
const Slide = ({ images, videos, index = 1, open = false, onClose }: SlideProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isShowThumbs, setIsShowThumbs] = useState<boolean>((images?.length || 1) > 1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(ZOOM_SETTINGS.minRatio);
  const swiperRef = useRef<SwiperRef | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useFullscreen(rootRef, isFullScreen, {
    onClose: () => {
      setIsFullScreen(false);
    },
  });
  const handleClose = () => {
    onClose?.();
    window.history.pushState(null, '', `#`);
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
      if (window.location.hash !== '#gallery') window.history.pushState(null, '', `#gallery`);
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== '#gallery') onClose?.();
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);
  return (
    <div
      ref={rootRef}
      className={clsx('w-full h-full bg-black fixed top-0 left-0 z-[9999]', open ? '' : 'hidden')}
    >
      <div className="relative h-full w-full">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          zoom={ZOOM_SETTINGS}
          className={clsx(
            'slide-class [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-4 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-4 ',
            'transition-all ease-in-out duration-200',
            'max-sm:[&_.swiper-button-prev]:hidden max-sm:[&_.swiper-button-next]:hidden',
            isShowThumbs ? 'h-[calc(100%_-_114px)]' : ' h-full w-full ',
          )}
          centeredSlides
          onZoomChange={(_, zoom) => {
            setScale(zoom);
          }}
          initialSlide={index}
          onSlideChange={() => {
            document.querySelectorAll('.slide-class video').forEach((element) => {
              if (element instanceof HTMLVideoElement) {
                if (!element.paused) element.pause();
              }
            });
          }}
        >
          {videos?.map((video) => (
            <SwiperSlide key={video} className="h-full w-full flex justify-center">
              <VideoTag video={video} />
            </SwiperSlide>
          ))}
          {images?.map((image) => (
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
            'max-w-full absolute h-[105px] bottom-1 mx-auto my-0 flex justify-center items-center left-0 right-0',
            'transition-all ease-in-out duration-200',
            isShowThumbs ? '' : 'translate-y-[120px]',
          )}
        >
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="my-0 mx-auto max-w-full [&_.swiper-slide-thumb-active_.bg]:!opacity-0"
            slidesPerView={'auto'}
          >
            {videos?.map((video) => (
              <SwiperSlide
                key={video}
                className="h-[105px] max-w-[105px] min-w-[105px] bg-black/30 flex justify-center items-center rounded-lg overflow-hidden relative"
              >
                <video src={video} className="w-full h-full"></video>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/60 z-10 bg"></div>
              </SwiperSlide>
            ))}
            {images?.map((image) => (
              <SwiperSlide
                key={image}
                className="h-[105px] max-w-[105px] min-w-[105px] bg-black/30 flex justify-center items-center rounded-lg overflow-hidden relative"
              >
                <Image
                  className="h-auto w-full object-cover"
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
              handleClose();
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
  const [isHorizontally, seIsHorizontally] = useState<boolean>(isWarehouse);
  const [isShowSlider, setIsShowSlider] = useState<boolean>(false);
  const [imageShowIndex, setImageShowIndex] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleImageClick = (index: number = 0) => {
    setImageShowIndex(index);
    setIsShowSlider(true);
  };

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
        <Slide
          images={images}
          open={true}
          index={imageShowIndex}
          onClose={() => {
            // router.back();
            setIsShowSlider(false);
          }}
        />
      )}
    </div>
  );
};

export { ImageGrid, Slide, VideoTag };
export type { ImageGridProps };
