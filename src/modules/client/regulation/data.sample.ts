import { RegulationTypes } from './components/post';

const POSTS_SAMPLE: RegulationTypes[] = [
  {
    id: 'registration-1',
    category: 'Quy định hướng dẫn',
    title: 'Quy định hướng dẫn',
    content: 'Quy định hướng dẫn',
    comments: [
      {
        id: 'comment-1',
        body: 'Hướng dẫn hay tôi cảm ơn bạn',
        user: {
          id: 'user-1',
          name: 'User 1',
          avatar: '/images/post-2.jpeg',
        },
      },
      {
        id: 'comment-2',
        body: 'Sao tôi không tìm thấy bài viết sớm hơn',
        user: {
          id: 'user-2',
          name: 'User 2',
          avatar: '/images/post-2.jpeg',
        },
      },
    ],
    comment_count: 2,
    like_count: 12,
    view_count: 98,
  },
];
export { POSTS_SAMPLE };
