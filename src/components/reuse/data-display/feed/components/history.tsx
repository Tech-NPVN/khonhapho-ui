'use client';

import { ModalEditHistory } from '@/common/modal';
import { ClockIcon, HistoryIcon } from '@/components/icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FeedProps } from '../type';

/** [Warehouse] Lịch sửa chỉnh sửa (Component nhỏ ở đầu)*/
export const WarehouseHistory: React.FC<FeedProps> = (props) => {
  const [isOpenModalEditHistory, setIsOpenModalEditHistory] = useState<boolean>(false);
  return (
    <>
      <div className={`h-full w-full flex justify-between items-center px-0 ${props?.className}}`}>
        <span className="flex items-center gap-1 sm:gap-2">
          <ClockIcon />
          <span className="inline-block leading-4 text-[12px]">
            {dayjs(props?.post?.updated_at).format('DD/MM/YYYY - hh:mm:ss')}
          </span>
        </span>
        <div
          className="border-none bg-transparent cursor-pointer flex items-center gap-1 sm:gap-2"
          onClick={() => {
            setIsOpenModalEditHistory(true);
          }}
        >
          <HistoryIcon />
          <span className="inline-block leading-4 text-[12px]">Lịch sử chỉnh sửa</span>
        </div>
      </div>
      <ModalEditHistory
        open={isOpenModalEditHistory}
        onClose={() => setIsOpenModalEditHistory(false)}
      />
    </>
  );
};
