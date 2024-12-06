'use client';

import { PenIcon, ThreeDotIcon, TrashIcon } from '@/components/icons';
import clsx from 'clsx';
import { useRouter } from 'next-nprogress-bar';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const BlogThreeDot = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  useClickAway(rootRef, () => {
    setIsShowMenu(false);
  });
  return (
    <div ref={rootRef}>
      <div
        className="cursor-pointer w-6 h-6 hover:bg-black/5 rounded flex justify-center items-center"
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <ThreeDotIcon className="scale-125" />
      </div>
      <div className={clsx('relative ', isShowMenu ? 'block' : 'hidden')}>
        <div className="absolute top-1 right-0 min-w-32 sm:min-w-32  border-t dark:border-t-0 border-black/5 border-0  border-solid dark:border-divider_d bg-white dark:bg-background_d shadow-md rounded-lg flex flex-col py-2 px-1 z-20">
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={() => {
              router.push('/admin/media/blog/id/edit');
              setIsShowMenu(false);
            }}
          >
            <div className="flex justify-center w-4">
              <PenIcon />
            </div>
            <span className="max-sm:text-base">Chỉnh sửa</span>
          </div>
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={() => {}}
          >
            <div className="flex justify-center w-4">
              <TrashIcon />
            </div>
            <span className="max-sm:text-base">Xoá</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogThreeDot;
