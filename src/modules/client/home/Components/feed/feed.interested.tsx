'use client';
import Feed from '@/components/reuse/data-display/feed';
import { useEffect, useState } from 'react';
import { HOME_POSTS } from './data.sample';
import InterestedFilter from './interested-filter';

const FeedInterested = () => {
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  return (
    <>
      <InterestedFilter />
      <div className="w-full mt-4 gap-4 flex flex-col sm:mt-6 sm:gap-6">
        {!loading &&
          HOME_POSTS.map((post, index) => <Feed type="warehouse" key={post.id} post={post} />)}
        {loading && Array.from({ length: 3 }).map((_, index) => <Feed key={index} />)}
      </div>
    </>
  );
};

export { FeedInterested };
