import { CommentTypes } from '../comment';
import { ThreeDotEventProps } from './three-dot';

export interface PostDetailTypes {
  id?: string;
  author?: {
    name?: string;
    email?: string;
    avatar?: string;
    phone?: string;
    message?: string;
  };
  content?: string;
  videos?: string[];
  images?: string[];
  tags?: string[];
  view_count?: number;
  like_count?: number;
  created_at?: string;
  updated_at?: string;
  comments?: CommentTypes[];
}

export interface PostDetailProps {
  post?: PostDetailTypes;
  classNames?: {
    root?: string;
  };
  isWarehouse?: boolean;
  isUrgently?: boolean;
  className?: string;
  threeDot?: boolean;
  threeDotEvents?: ThreeDotEventProps;
  onHashtagClick?: (hashtag?: string) => void;
}
