import { CommentTypes } from '@/components/reuse/data-display';

interface LibNhaPhoTypes {
  id?: string;
  title?: string;
  content?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  view_count?: number;
  comment_count?: number;
  like_count?: number;
  comments?: CommentTypes[];
}
export type { LibNhaPhoTypes };
