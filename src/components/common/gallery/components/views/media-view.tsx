import React from 'react';
import ImageView, { AspectRatio } from './image-view';
import VideoView from './video-view';

export type MediaViewProps = {
  /** Đường dẫn ảnh hoặc video  */
  src: string;
  /** Thời gian up ảnh lên */
  time?: string;
  className?: string;
  visibility?: boolean;
  aspect?: AspectRatio;
  numberOverlay?: number;
  /** Loại media */
  type: 'video' | 'image';
};
const MediaView: React.FC<MediaViewProps> = ({ type, ...props }) => {
  return <>{type === 'video' ? <VideoView {...props} /> : <ImageView {...props} />}</>;
};

export default MediaView;
