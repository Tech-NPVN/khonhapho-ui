'use client';

import {
  ArrowDownLeftAndUpRightToCenterIcon,
  ArrowRightIcon,
  ArrowUpRightAndDownLeftFromCenterIcon,
  ClockIcon,
  DownLoadIcon,
  Grid2Icon,
  RotateRightIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/components/icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { OverlayRenderProps } from 'react-photo-view/dist/types';
import { useMedia } from 'react-use';
import { handleDownloadMedia } from '../helpers/download.func';
import { useFullscreen } from '../hooks/use-fullscreen.hook';
import useSetHash from '../hooks/use-set-hash.hook';
import { ToolBarOptions } from '../types';
import GalleryThumbnail from './thumb';
import { MediaViewProps } from './views/media-view';

const Config = {
  minRatio: 1,
  maxRatio: 3,
  hash: 'gallery',
};

export type MediaOverlayProps = Omit<OverlayRenderProps, 'images'> & {
  /** Danh sách ảnh hoặc video */
  media?: Omit<MediaViewProps, 'className' | 'aspect' | 'visibility' | 'numberOverlay'>[];
  /**Các nút bấm ở xem chi tiết */
  toolbar?: ToolBarOptions;
};

const ToolbarData: MediaOverlayProps['toolbar'] = {
  nav: true,
  zoom: true,
  count: true,
  close: true,
  rotate: true,
  download: true,
  thumbnail: true,
  fullscreen: true,
  time_update: true,
};

const MediaOverlay: React.FC<MediaOverlayProps> = ({
  scale,
  index,
  rotate,
  media = [],
  onScale,
  onClose,
  onRotate,
  onIndexChange,
  overlayVisible,
  toolbar: toolbarCustom,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isFullscreen, toggleFullscreen] = useFullscreen();
  const { setHash, clearHash } = useSetHash(() => onClose());
  const [hideFeatures, setHideFeatures] = useState<boolean>(false);
  const [hideThumbnail, setHideThumbnail] = useState<boolean>(media.length === 1);
  const isMobile = useMedia('(max-width: 520px)');
  const toolbar = { ...ToolbarData, ...toolbarCustom };
  // lấy opacity từ màu nền Backdrop
  useEffect(() => {
    setHash(Config.hash);
    const getOpacityFromBackground = () => {
      const backdrop = document.querySelector<HTMLElement>('.PhotoView-Slider__Backdrop');
      if (!backdrop) {
        setHideFeatures(true);
        return;
      }
      const computedStyle = getComputedStyle(backdrop);
      const background = computedStyle.backgroundColor;
      const rgbaMatch = background.match(/rgba?\((\d+), (\d+), (\d+), ?([\d.]+)?\)/);
      if (rgbaMatch) {
        const extractedOpacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
        setHideFeatures(extractedOpacity < 0.75);
      } else setHideFeatures(false);
    };
    getOpacityFromBackground();
    const observer = new MutationObserver(getOpacityFromBackground);
    const backdrop = document.querySelector('.PhotoView-Slider__Backdrop');
    if (backdrop) observer.observe(backdrop, { attributes: true, attributeFilter: ['style'] });
    return () => {
      observer.disconnect();
      if (location.hash?.replace('#', '') === Config.hash) window.history.back();
    };
  }, [clearHash, setHash]);
  // Sửa lỗi render lần đầu mà thumbnail bị đẩy lên kéo xuống
  useEffect(() => {
    if (!loaded || media.length === 1) return;
    setHideThumbnail((prev) => !prev);
  }, [loaded, media.length, overlayVisible]);
  // Sửa lỗi index = -1 khi thay đổi màn hình mobile => tablet
  useEffect(() => {
    if (index === -1) onIndexChange(0);
  }, [index, onIndexChange]);
  // Hiển thị đầu chủ
  // Loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {/* toolbar góc trên bên phải */}
      <div className={`absolute top-0 right-1 z-20 flex ${hideFeatures ? 'opacity-0' : ''}`}>
        {/* count <640px */}
        {toolbar?.count && (
          <div
            className={
              `w-10 h-10 text-sm pt-[2px] text-white bg-black/20 sm:hidden flex justify-center items-center` +
              `${toolbar.classNames?.count ?? ''}`
            }
          >
            {index + 1}/{media.length}
          </div>
        )}
        {/* Tải xuống */}
        {toolbar?.download && (
          <button
            className={
              `w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50` +
              ` ${toolbar.classNames?.download ?? ''}`
            }
            onClick={() => {
              handleDownloadMedia(media[index].src ?? '');
            }}
          >
            <DownLoadIcon className="fill-white" width={20} height={20} />
          </button>
        )}
        {/* Xoay phải +90 */}
        {toolbar?.rotate && (
          <button
            className={
              `w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50` +
              ` ${toolbar.classNames?.rotate}`
            }
            onClick={() => {
              onRotate(rotate + 90);
            }}
          >
            <RotateRightIcon className="fill-white" width={16} height={16} />
          </button>
        )}
        {/* Scale - 1 */}
        {toolbar?.zoom && (
          <button
            className={`w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50 ${
              toolbar.classNames?.zoom_out ?? ''
            }`}
            onClick={() => {
              onScale(scale - 1);
            }}
            disabled={scale === Config.minRatio}
          >
            <ZoomOutIcon className="fill-white" width={20} height={20} />
          </button>
        )}
        {/* Scale + 1 */}
        {toolbar?.fullscreen && (
          <button
            className={`w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 [&_svg]:disabled:fill-white/50 ${
              toolbar.classNames?.zoom_in ?? ''
            }`}
            onClick={() => {
              onScale(scale + 1);
            }}
            disabled={scale === Config.maxRatio}
          >
            <ZoomInIcon className="fill-white" width={20} height={20} />
          </button>
        )}
        {/* Thumbnail */}
        {toolbar?.thumbnail && (
          <button
            className={`w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 ${
              toolbar.classNames?.thumbnail ?? ''
            }`}
            onClick={() => {
              setHideThumbnail((prev) => !prev);
            }}
          >
            <Grid2Icon className="fill-white" width={24} height={24} />
          </button>
        )}
        {/* FullScreen */}
        {toolbar?.fullscreen && (
          <button
            className={`w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:hover:bg-white/20 ${
              toolbar.classNames?.fullscreen ?? ''
            }`}
            onClick={() => {
              toggleFullscreen('.media-fullscreen-selector');
            }}
          >
            {isFullscreen ? (
              <ArrowDownLeftAndUpRightToCenterIcon className="fill-white" width={18} height={18} />
            ) : (
              <ArrowUpRightAndDownLeftFromCenterIcon
                className="fill-white"
                width={18}
                height={18}
              />
            )}
          </button>
        )}
      </div>
      {/* Đóng */}
      {toolbar?.close && (
        <div
          className={`absolute top-0 left-0 sm:top-3 sm:left-3 z-20 ${
            toolbar.classNames?.close ?? ''
          } ${hideFeatures ? 'opacity-0' : ' '} `}
        >
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center sm:rounded-full sm:hover:bg-white/20"
            onClick={() => {
              onClose();
            }}
          >
            <XIcon className="fill-white" width={24} height={24} />
          </button>
        </div>
      )}
      {/* Thời gian tạo / cập nhật của ảnh */}
      {toolbar?.time_update && media[index]?.time && (
        <div
          className={`absolute top-0 sm:top-3 left-12 sm:left-16 z-20 flex items-center h-10 text-white gap-2
             ${toolbar.classNames?.time_update ?? ''}
              ${hideFeatures ? 'opacity-0' : ' '}
              `}
        >
          <ClockIcon className="fill-white dark:fill-white scale-125" />
          <span>{dayjs(media[index]?.time).format('DD/MM/YYYY HH:mm:ss')}</span>
        </div>
      )}
      {/* Đếm index/total */}
      {!hideThumbnail && toolbar?.count && loaded && (
        <div
          className={`absolute top-2 left-1/2 -translate-x-1/2 z-20 text-white text-lg max-sm:hidden ${
            toolbar.classNames?.count ?? ''
          } ${hideFeatures || !loaded ? 'opacity-0' : ' '}`}
        >
          {index + 1}/{media.length}
        </div>
      )}
      {/* Next */}
      {toolbar?.nav && (
        <div
          className={
            'absolute -translate-y-1/2 top-1/2 right-3 z-20' +
            ` ${toolbar.classNames?.nav_next ?? ''}` +
            ` ${hideFeatures ? 'opacity-0' : ''}` +
            ` ${(isMobile && hideThumbnail) || media.length === 1 || !loaded ? 'hidden' : ''}`
          }
        >
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center rounded-full sm:hover:bg-white/20 disabled:opacity-35"
            onClick={() => {
              onIndexChange(index + 1);
            }}
            disabled={index === media.length - 1}
          >
            <ArrowRightIcon
              className="[&_path]:!fill-white dark:[&_path]:!fill-white"
              width={32}
              height={32}
            />
          </button>
        </div>
      )}
      {/* Prev */}
      {toolbar?.nav && (
        <div
          className={
            'absolute -translate-y-1/2 top-1/2 left-3 z-20' +
            ` ${toolbar.classNames?.nav_prev ?? ''}` +
            ` ${hideFeatures ? ' opacity-0' : ''}` +
            ` ${(isMobile && hideThumbnail) || media.length === 1 || !loaded ? ' hidden' : ''}`
          }
        >
          <button
            className="w-10 h-10 cursor-pointer bg-black/20 border-none flex justify-center items-center rounded-full sm:hover:bg-white/20  disabled:opacity-35"
            onClick={() => {
              onIndexChange(index - 1);
            }}
            disabled={index === 0}
          >
            <ArrowRightIcon
              className="rotate-180 [&_path]:!fill-white dark:[&_path]:!fill-white"
              width={32}
              height={32}
            />
          </button>
        </div>
      )}
      {/*Thumb*/}
      {toolbar?.thumbnail && (
        <div
          className={
            'max-w-full fixed h-[105px] bottom-2 mx-auto my-0 flex justify-center items-center left-0 right-0 z-50 transition-all ease-in-out duration-200 translate-y-[120px] opacity-100' +
            ` ${toolbar.classNames?.thumbnail_slider}` +
            ` ${hideFeatures ? '!opacity-0' : ''}` +
            ` ${hideThumbnail || !loaded ? '' : '!translate-y-0'}`
          }
        >
          <GalleryThumbnail
            index={index}
            media={media}
            onThumbnailClick={(index: number) => {
              onIndexChange(index);
            }}
          />
        </div>
      )}
    </>
  );
};

export default MediaOverlay;
