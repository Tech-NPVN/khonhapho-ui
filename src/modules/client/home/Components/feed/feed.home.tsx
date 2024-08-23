'use client';

import clsx from 'clsx';
import PostDetail from '../../../../../components/reuse/data-display/post';
import HomePinComponent from '../pin/pin';
import { FeedBanner } from './feed.banner';

const FeedHome = () => {
  return (
    <div className="w-full sm:mt-6 mt-4">
      <div className="w-full flex sm:flex-col  flex-col-reverse">
        <div className="w-full hidden sm:block">
          <FeedBanner />
        </div>
        <div className="sm:mt-6 mt-0">
          <HomePinComponent className="sm:rounded-lg rounded-none" />
        </div>
        <div
          className={clsx(
            'mb-4 bg-white h-[42px] dark:bg-primary_color_d rounded-lg shadow-sm flex items-center ',
            'sm:mt-6 sm:mb-0',
            'sm:w-full w-[calc(100%_-_24px)] mx-3 sm:mx-0',
          )}
        >
          <div className="w-full flex">
            <div className="w-10 h-[42px] flex items-center justify-center">
              <svg
                width={25}
                height={25}
                viewBox="0 0 25 25"
                className="fill-black/50 dark:fill-[#daefff]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.1956 15.9683L22.5 21.2727L21.1145 22.6582L15.8101 17.3538L17.1956 15.9683Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3174 4.61762C7.52983 4.61762 4.45942 7.68804 4.45942 11.4756C4.45942 15.2631 7.52983 18.3336 11.3174 18.3336C15.1049 18.3336 18.1754 15.2631 18.1754 11.4756C18.1754 7.68804 15.1049 4.61762 11.3174 4.61762ZM2.5 11.4756C2.5 6.60588 6.44768 2.6582 11.3174 2.6582C16.1871 2.6582 20.1348 6.60588 20.1348 11.4756C20.1348 16.3453 16.1871 20.293 11.3174 20.293C6.44768 20.293 2.5 16.3453 2.5 11.4756Z"
                />
              </svg>
            </div>
            <input
              className="flex-1 outline-none border-none bg-transparent pe-3"
              type="text"
              placeholder="Nhập nội dung tìm kiếm"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 gap-4 flex flex-col sm:mt-6 sm:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostDetail
            key={'post-' + index}
            post={{
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
                '/images/post-6.jpeg',
              ].splice(0, index),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { FeedHome };
