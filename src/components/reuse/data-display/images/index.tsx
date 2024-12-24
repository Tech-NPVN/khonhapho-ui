'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';

// 5 ca
import { MediaGallery, MediaGalleryFeedConfig } from '@/components/common/gallery';
import {
  ArrowDownLeftAndUpRightToCenterIcon,
  ArrowUpRightAndDownLeftFromCenterIcon,
  DownLoadIcon,
  Grid2Icon,
  RotateRightIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/components/icons';
import { useFullscreen } from 'react-use';

interface ImageGridProps {
  className?: string;
  images: string[];
  onImageClick?: (index: number) => void;
  maxImagePreview?: number;
  canDownload?: boolean;
}

const ZOOM_SETTINGS = { minRatio: 1, maxRatio: 3 };
export interface SlideProps {
  className?: string;
  videos?: string[];
  images?: string[];
  index?: number;
  open?: boolean;
  canDownload?: boolean;
  onClose?: () => void;
}

const HASH = '#gallery';

/** Đã thay đổi sang (MediaGallery) mode = slider */
const ImageSlider = ({
  images = [],
  videos = [],
  index = 1,
  open = false,
  className,
  canDownload = true,
  onClose,
}: SlideProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isShowThumbs, setIsShowThumbs] = useState<boolean>((images?.length || 1) > 1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(ZOOM_SETTINGS.minRatio);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [mediaRotate, setMediaRotate] = useState<number[]>(
    Array.from({
      length: images.length + videos.length,
    }).fill(0) as number[],
  );
  const swiperRef = useRef<SwiperRef | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useFullscreen(rootRef, isFullScreen, {
    onClose: () => {
      setIsFullScreen(false);
    },
  });
  const handleClose = () => {
    window.history.back();
  };
  const handleDownload = async () => {
    const index = swiperRef.current?.swiper.activeIndex || 0;
    const videoLength = videos?.length || 0;
    if (index < videoLength) return;
    const fileUrl = images?.[index - videoLength];
    if (!fileUrl) return;
    const getFileType = (fileNameOrBlob: string | Blob): string | null => {
      if (typeof fileNameOrBlob === 'string') {
        const regex = /(?:\.([^.]+))?$/;
        const match = fileNameOrBlob.match(regex);
        return match && match[1] ? match[1] : null;
      } else if (fileNameOrBlob instanceof Blob) {
        const mimeType = fileNameOrBlob.type;
        const mimeTypesToExtensions: { [key: string]: string } = {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/gif': 'gif',
          'video/mp4': 'mp4',
          // Add more MIME types and their corresponding extensions as needed
        };
        return mimeTypesToExtensions[mimeType] || null;
      }
      return null;
    };
    const isBlobUrl = (url: string): boolean => {
      return url.startsWith('blob:');
    };
    let blob;
    if (isBlobUrl(fileUrl)) {
      // If fileUrl is already a blob URL, we don't need to fetch it
      blob = await fetch(fileUrl).then((response) => response.blob());
    } else {
      // Otherwise, fetch the file from the URL
      const response = await fetch(fileUrl);
      blob = await response.blob();
    }
    const fileType = getFileType(blob) || getFileType(fileUrl);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'nha-pho-viet-nam' + (fileType ? '.' + fileType : '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);

      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        swiperRef.current?.swiper.slidePrev();
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        swiperRef.current?.swiper.slideNext();
      }
      if (e.key.match(/\d/)) swiperRef.current?.swiper.slideTo(parseInt(e.key) - 1);
    };
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateHeight);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
      if (window.location.hash !== HASH) {
        window.history.pushState(null, '', HASH);
      }
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== HASH) onClose?.();
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);
  return (
    <div
      ref={rootRef}
      className={clsx(
        'w-screen h-screen bg-black fixed top-0 left-0 z-[9999]',
        open ? '' : 'hidden',
        className,
      )}
    >
      <div className="relative h-screen w-screen select-none">
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          zoom={ZOOM_SETTINGS}
          className={clsx(
            'slide-class [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:ms-4 [&_.swiper-button-next]:text-white [&_.swiper-button-next]:me-4',
            'transition-all ease-in-out duration-200',
            'max-sm:[&_.swiper-button-prev]:hidden max-sm:[&_.swiper-button-next]:hidden',
            'w-full',
          )}
          style={{
            height: isShowThumbs ? `${windowHeight - 120}px` : `${windowHeight}px`,
          }}
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
          slidesPerView={1}
          direction="horizontal"
          onInit={() => {
            setIsLoading(false);
          }}
        >
          {videos?.map((video, index) => (
            <SwiperSlide
              style={{
                rotate: `${mediaRotate[index]}deg`,
              }}
              key={video}
              className="h-full w-full flex justify-center transition-all ease-in-out duration-200"
            >
              {/* <VideoTag video={video} /> */}
            </SwiperSlide>
          ))}

          {images?.map((image, index) => {
            const rotateReal = mediaRotate[index + (videos?.length || 0)];
            const rotateValue = rotateReal % 360;
            const rotated = [90, 270].includes(rotateValue);
            const calculatedHeight = isShowThumbs ? `${windowHeight - 120}px` : `${windowHeight}px`;
            return (
              <SwiperSlide
                key={image}
                className={clsx(
                  'h-full w-full flex justify-center items-center ',
                  isLoading ? 'transition-none' : 'transition-all ease-in-out duration-200',
                )}
              >
                <div
                  className={clsx(
                    'swiper-zoom-container flex justify-center items-center',
                    rotated ? 'w-auto h-full' : 'w-full h-full',
                  )}
                  style={{
                    width: rotated ? calculatedHeight : '100%',
                  }}
                >
                  <Image
                    style={{
                      rotate: `${rotateReal}deg`,
                    }}
                    className={clsx(
                      'transition-all duration-200 ease-in-out object-contain',
                      rotated ? 'h-full max-h-full w-auto' : 'w-full h-auto',
                    )}
                    width={0}
                    height={0}
                    src={image}
                    alt={image}
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className={clsx(
            'max-w-full fixed h-[105px] bottom-1 mx-auto my-0 flex justify-center items-center left-0 right-0 z-50',
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
                <div className="flex-1 aspect-square relative overflow-hidden">
                  <Image
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    width={120}
                    height={120}
                    src={image}
                    alt={image}
                  />
                </div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/60 z-10 bg"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute top-0 right-0 sm:right-1 z-20 flex">
          {canDownload && (
            <button
              className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50"
              onClick={handleDownload}
            >
              <DownLoadIcon className="fill-white" width={20} height={20} />
            </button>
          )}
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50"
            onClick={() => {
              setMediaRotate((prev) => {
                const newRotate = prev.map((rotate, index) =>
                  index === swiperRef.current?.swiper.activeIndex ? rotate + 90 : rotate,
                );
                return newRotate;
              });
            }}
          >
            <RotateRightIcon className="fill-white" width={16} height={16} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50"
            onClick={() => {
              swiperRef.current?.swiper.zoom.in(scale - 1);
            }}
            disabled={scale === ZOOM_SETTINGS.minRatio}
          >
            <ZoomOutIcon className="fill-white" width={20} height={20} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50"
            onClick={() => {
              swiperRef.current?.swiper.zoom.in(scale + 1);
            }}
            disabled={scale === ZOOM_SETTINGS.maxRatio}
          >
            <ZoomInIcon className="fill-white" width={20} height={20} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20"
            onClick={() => {
              setIsShowThumbs((prev) => !prev);
            }}
          >
            <Grid2Icon className="fill-white" width={24} height={24} />
          </button>
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20"
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
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center rounded-full sm:hover:bg-white/20"
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

/** Đã thay đổi sang (MediaGallery) */
const ImageGrid = ({
  className,
  images,
  horizontally = false,
  canDownload = true,
  maxImagePreview = 5,
}: ImageGridProps & { horizontally?: boolean }) => {
  return (
    <div className="w-full">
      <MediaGallery
        mode={horizontally ? 'grid' : 'feed'}
        media={images.map((img) => ({
          type: 'image',
          src: img,
        }))}
        configs={{
          feed: { maxMediaDisplay: maxImagePreview as MediaGalleryFeedConfig['maxMediaDisplay'] },
          grid: {
            maxMediaDisplay: maxImagePreview,
            imagePerRow: maxImagePreview,
          },
        }}
        toolbar={{
          download: canDownload,
        }}
      />
    </div>
  );
};

export { ImageGrid, ImageSlider };
export type { ImageGridProps };
