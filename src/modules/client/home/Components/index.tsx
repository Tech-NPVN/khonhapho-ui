'use client';

import Content from './content';
import { FeedBanner } from './feed';
import { ListShortcuts } from './shortcuts';

const HomeIndex = () => {
  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl sm:px-2 md:px-4">
            <div className="my-4 w-[calc(100%-32px)] mx-auto sm:hidden">
              <ListShortcuts />
            </div>
            <div className="w-full block min-[640px]:hidden">
              <FeedBanner />
            </div>
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export { HomeIndex };
