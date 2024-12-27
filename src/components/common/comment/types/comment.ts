export interface CommentType {
  id: number | string;
  text?: string;
  author: {
    id: number | string;
    name: string;
    avatarSrc?: string;
  };
  image?: string;
  like_count?: number;
  replies?: CommentType[];
  created_at?: string;
  updated_at?: string;
}
