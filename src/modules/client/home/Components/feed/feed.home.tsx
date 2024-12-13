'use client';

import { MiniSearch } from '@/components/common';
import Feed from '@/components/reuse/data-display/feed';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import HomePinComponent from '../pin/pin';
import { HOME_POSTS } from './data.sample';
import { FeedBanner } from './feed.banner';

const FeedHome = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<{
    text?: string;
    hashtag?: string;
  }>();

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 200);
  });

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
            'mb-4',
            'sm:mt-6 sm:mb-0',
            'sm:w-full w-[calc(100%_-_24px)] mx-3 sm:mx-0',
            loading ? 'hidden' : '',
          )}
        >
          <MiniSearch
            defaultValue={searchData?.text}
            hashtag={searchData?.hashtag}
            onTagChange={(value) => {
              setSearchData((prev) => ({
                ...prev,
                hashtag: value,
              }));
            }}
          />
        </div>
      </div>
      <div className="w-full mt-4 gap-4 flex flex-col sm:mt-6 sm:gap-6">
        {!loading &&
          HOME_POSTS.map((post) => (
            <Feed
              key={post.id || ''}
              post={post}
              onHashtagClick={(hashtag) =>
                setSearchData((prev) => ({
                  ...prev,
                  hashtag,
                }))
              }
            />
          ))}
        {loading && Array.from({ length: 2 }).map((_, index) => <Feed key={index} />)}
      </div>
    </div>
  );
};

export { FeedHome };
