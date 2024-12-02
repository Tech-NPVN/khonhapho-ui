'use client';

import React from 'react';
import MediaOverlay, { MediaOverlayProps } from './components/overlay';

import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import MediaImageFeed from './components/media-feed';
import MediaImageGrid from './components/media-grid';
import MediaSlider from './components/media-slider';
import { AspectRatio } from './components/views/image-view';
import { MediaViewProps } from './components/views/media-view';
import './custom-gallery.css';

type MediaGalleryGridConfig = {
  gap?: number;
  wrap?: boolean;
  width?: number;
  height?: number;
  className?: string;
  aspect?: AspectRatio; // ưu tiên hơn width, height
  imagePerRow?: number; // ưu tiên hơn width, height
  imageClassName?: string;
  maxMediaDisplay?: number;
};

type MediaGalleryFeedConfig = {
  className?: string;
  maxMediaDisplay?: 1 | 2 | 3 | 4 | 5;
};

type MediaGalleryConfig = {
  grid?: MediaGalleryGridConfig;
  feed?: MediaGalleryFeedConfig;
};

type MediaProps = {
  className?: string;
  media?: MediaViewProps[];
  configs?: MediaGalleryConfig;
  toolbar?: MediaOverlayProps['toolbar'];
  mode?: 'grid' | 'feed' | 'slider';
};

const MediaGallery: React.FC<MediaProps> = ({
  className,
  media = [],
  mode = 'grid',
  configs,
  toolbar,
}) => {
  return (
    <>
      <div className={`w-full ${className ?? ''}`}>
        <PhotoProvider
          loop={false}
          speed={() => 400}
          maskClosable={false} // bỏ ấn nền đen thì đóng
          bannerVisible={false} // ẩn các nút mặc định
          className="select-none media-fullscreen-selector"
          photoClassName="photo-view__content"
          overlayRender={({ images: imgs, ...props }) => {
            return <MediaOverlay {...props} media={media} toolbar={toolbar} />;
          }}
        >
          {mode === 'feed' && (
            <MediaImageFeed
              media={media}
              className={configs?.feed?.className}
              maxMediaDisplay={configs?.feed?.maxMediaDisplay}
            />
          )}
          {mode == 'grid' && <MediaImageGrid media={media} {...configs?.grid} />}
          {mode === 'slider' && <MediaSlider media={media} />}
        </PhotoProvider>
      </div>
    </>
  );
};
export { MediaGallery };
export type { MediaGalleryFeedConfig, MediaGalleryGridConfig, MediaProps };
