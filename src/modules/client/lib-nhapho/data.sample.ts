import { LibNhaPhoTypes } from './lib.types';

const CATEGORY_SAMPLE = [
  { value: 'danh-gia-Bat-dong-san', label: 'Đánh giá Bất động sản' },
  { value: 'ky-nang-co-ban', label: 'Kỹ năng cơ bản' },
  { value: 'ky-nang-dang-tin', label: 'Kỹ năng Đăng tin' },
  { value: 'ky-nang-tuong-tac-khach-hang', label: 'Kỹ năng Tương tác khách hàng' },
  { value: 'phap-ly', label: 'Pháp lý' },
];
const POSTS_SAMPLE: LibNhaPhoTypes[] = [
  {
    id: 'lib-1',
    category: CATEGORY_SAMPLE[0].label,
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
    tags: ['npvn'],
    comment_count: 2,
    like_count: 12,
    view_count: 98,
  },
  {
    id: 'lib-2',
    category: CATEGORY_SAMPLE[2].label,
    title: 'Thư viện kiến thức title',
    content: 'Thư viện kiến thức content',
    comments: [],
    tags: ['npvn-999', 'dev'],
    comment_count: 0,
    like_count: 2344,
    view_count: 6754,
  },
];

export { CATEGORY_SAMPLE, POSTS_SAMPLE };
