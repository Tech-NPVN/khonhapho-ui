'use client';

import { Comment } from '@/components/common/comment';
import { CommentInput } from '@/components/common/comment/input';
import { TiptapEditorForCommentInput } from '@/components/common/comment/tiptap';
import { addFlagSpan } from '@/components/common/comment/tiptap/tiptap-helpers';
import { CommentType } from '@/components/common/comment/types';
import { EmojiSelector } from '@/components/common/emoji-picker';

export const imagesDemo = [
  '/images/post-1.jpeg',
  '/images/post-2.jpeg',
  '/images/post-3.jpeg',
  '/images/post-4.jpeg',
  '/images/banner.png',
  '/images/post-6.jpeg',
];
export const commentDemo: CommentType = {
  author: {
    id: 1,
    name: 'Quang Trong',
    avatarSrc: '/images/user-default.jpg',
  },
  text: `
  <p>Nice post!</p>`,
  id: 1,
  like_count: 4,
  // image: '/images/post-5.jpeg',
  replies: [
    {
      author: {
        id: 2,
        name: 'User 2',
        avatarSrc: '/images/post-2.jpeg',
      },
      text: `<p>Good post!</p>`,
      id: 2,
      like_count: 2,
    },
    {
      author: {
        id: 3,
        name: 'User 3',
        avatarSrc: '/images/post-3.jpeg',
      },
      text: `<p>Great post!</p>`,
      id: 3,
      like_count: 3,
      image: '/images/post-4.jpeg',
    },
  ],
};

const videos = ['/videos/house-preview.mp4'];
function page() {
  return (
    <div className="p-6">
      <h1>Test</h1>
      <div className="flex gap-5 justify-center rounded-lg p-2 bg-white dark:bg-primary_color_d">
        <Comment comment={commentDemo} isPreview />
      </div>
      <div className="mt-5 py-5 bg-white">
        <CommentInput showAvatar />
      </div>
      <div>{/* <Video src={videos[0]} /> */}</div>
      <h2>
        <EmojiSelector>a</EmojiSelector>
      </h2>
      <div className="flag-font">🇻🇳</div>
      <div>
        <TiptapEditorForCommentInput defaultContent={addFlagSpan('🇻🇳 : đây là lá cờ 🇻🇳')} />
      </div>
    </div>
  );
}

export default page;
