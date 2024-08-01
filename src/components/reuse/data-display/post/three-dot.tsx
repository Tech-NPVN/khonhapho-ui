import { DuplicateIcon, LockIcon, PenIcon, ThreeDotIcon, TrashIcon } from '@/components/icons';
import { PinIcon } from '@/components/icons/pin.icon';
import { WarningIcon } from '@/components/icons/warning.icon';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const ThreeDot = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const MenuRef = useRef<HTMLDivElement>(null);
  useClickAway(MenuRef, () => {
    setIsShowMenu(false);
  });
  return (
    <>
      <div
        ref={MenuRef}
        className="w-8 h-8 hover:bg-divider_l hover:dark:bg-divider_d flex justify-center items-center rounded-lg cursor-pointer "
        onClick={() => {
          setIsShowMenu(!isShowMenu);
        }}
      >
        <ThreeDotIcon width={16} height={3} />
      </div>
      <div className={clsx('relative ', isShowMenu ? 'block' : 'hidden')}>
        <div className="absolute top-2 right-0 min-w-48 min-h-32 border-t dark:border-t-0 border-black/5 border-0  border-solid dark:border-divider_d bg-white dark:bg-background_d shadow-md z-10 rounded-lg flex flex-col py-2 px-1">
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <PenIcon />
            </div>
            <span>Chỉnh sửa bài viết</span>
          </div>
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <TrashIcon />
            </div>
            <span>Xoá bài viết</span>
          </div>
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <LockIcon />
            </div>
            <span>Khoá bình luận</span>
          </div>
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <DuplicateIcon />
            </div>
            <span>Sao chép bài viết</span>
          </div>
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <PinIcon />
            </div>
            <span>Ghim bài viết</span>
          </div>
          <div className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d">
            <div className="flex justify-center w-4">
              <WarningIcon />
            </div>
            <span>Báo cáo bài viết</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeDot;
