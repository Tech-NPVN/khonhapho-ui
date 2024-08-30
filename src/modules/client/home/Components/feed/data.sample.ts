import { IPostDetail } from '@/components/reuse/data-display';
function getRandomDate() {
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2024, 8, 31);
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = new Date(start + Math.random() * (end - start));
  return randomTime;
}
function getRandomInt() {
  return Math.floor(Math.random() * 999);
}
const HOME_POSTS = Array.from({ length: 10 }).map((_, i) => ({
  id: 'post-detail-' + i,
  content: `Tôi có khách cần mua gấp, kính nhờ anh chị
                        em tìm hộ giúp tôi. Tiêu chí khách:<br/>
                        <b>Khu vực</b>: Hà Nội
                        <br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        <br>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        <br> 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br>
                        Lorem ipsum dolor sit amet, con in culpa qui officia deserunt mollit anim id est laborum.
                        `,
  images: [
    '/images/post-1.jpeg',
    '/images/post-6.jpeg',
    '/images/test.jpg',
    '/images/banner.png',
    '/images/banner-2.png',
    '/images/post-2.jpeg',
    '/images/post-3.jpeg',
    '/images/post-4.jpeg',
    '/images/post-5.jpeg',
  ],
  created_at: getRandomDate().toISOString(),
  view_count: getRandomInt(),
  like_count: getRandomInt(),
})) as IPostDetail[];
export { HOME_POSTS };
