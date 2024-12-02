import { CommentTypes } from '../comment';
import { ThreeDotEventProps } from './components/three-dot';

export interface FeedType {
  id?: string;
  user?: {
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
export type FeedProps = {
  post?: FeedType;
  classNames?: {
    root?: string;
  };
  type?: 'warehouse' | 'urgently' | 'default';
  className?: string;
  threeDotEvents?: ThreeDotEventProps;
  onHashtagClick?: (hashtag?: string) => void;
};

export type FeedContentProps = {
  className?: string;
  post?: FeedType;
  maxLineDisplay?: number;
};

export type HashtagProps = {
  items?: string[];
  className?: string;
  onHashtagClick?: (hashtag: string) => void;
};
