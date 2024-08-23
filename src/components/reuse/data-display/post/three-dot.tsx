import { LockIcon, PenIcon, ThreeDotIcon, TrashIcon } from '@/components/icons';
import { PinIcon } from '@/components/icons/pin.icon';
import { WarningIcon } from '@/components/icons/warning.icon';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
export interface ThreeDotEventProps {
  editEvent?: () => void;
  deleteEvent?: () => void;
  lockEvent?: () => void;
  copyEvent?: () => void;
  pinEvent?: () => void;
  reportEvent?: () => void;
}

export interface ThreeDotProps {
  isUrgently?: boolean;
  threeDotEvents?: ThreeDotEventProps;
}

const ThreeDot = ({ isUrgently, threeDotEvents }: ThreeDotProps) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const MenuRef = useRef<HTMLDivElement>(null);
  useClickAway(MenuRef, () => {
    setIsShowMenu(false);
  });
  return (
    <div
      ref={MenuRef}
      className="w-8 h-8 hover:bg-divider_l hover:dark:bg-divider_d flex justify-center items-center rounded-lg cursor-pointer "
      onClick={() => {
        setIsShowMenu(!isShowMenu);
      }}
    >
      <ThreeDotIcon width={16} height={3} />
      <div className={clsx('relative ', isShowMenu ? 'block' : 'hidden')}>
        <div className="absolute top-5 right-0 min-w-56  sm:min-w-48 min-h-32 border-t dark:border-t-0 border-black/5 border-0  border-solid dark:border-divider_d bg-white dark:bg-background_d shadow-md rounded-lg flex flex-col py-2 px-1 z-20">
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.editEvent}
          >
            <div className="flex justify-center w-4">
              <PenIcon />
            </div>
            <span className="max-sm:text-base">Chỉnh sửa bài viết</span>
          </div>
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.deleteEvent}
          >
            <div className="flex justify-center w-4">
              <TrashIcon />
            </div>
            <span className="max-sm:text-base">Xoá bài viết</span>
          </div>
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.lockEvent}
          >
            <div className="flex justify-center w-4">
              <LockIcon />
            </div>
            <span className="max-sm:text-base">Khoá bình luận</span>
          </div>
          {/* <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.copyEvent}
          >
            <div className="flex justify-center w-4">
              <DuplicateIcon />
            </div>
            <span className="max-sm:text-base">Sao chép bài viết</span>
          </div> */}
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.pinEvent}
          >
            <div className="flex justify-center w-4">
              <PinIcon />
            </div>
            <span className="max-sm:text-base">Ghim bài viết</span>
          </div>
          <div
            className="flex gap-4 px-2 py-2 items-center rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-divider_d"
            onClick={threeDotEvents?.reportEvent}
          >
            <div className="flex justify-center w-4">
              <WarningIcon />
            </div>
            <span className="max-sm:text-base">Báo cáo bài viết</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ThreeDot };
