'use client';

import { MarqueeText } from '@/components/common';
import { Tag } from 'antd';
import clsx from 'clsx';
import { FeedProps } from '../type';
import { Hashtag } from './hashtag';

/**
 * [Warehouse] Diện tích giá đơn vị + Đặc điểm
 */
export const WarehouseInformation: React.FC<FeedProps> = ({ post, ...props }) => {
  return (
    <>
      <div className="justify-between items-center gap-2 flex">
        <div className={clsx('flex gap-[2px] sm:gap-1 md:gap-2 text-base')}>
          <span className="font-semibold text-color_l text-nowrap">27.727 tỷ</span>
          <span>·</span>
          <span className="text-nowrap">255.152tr/m</span>
        </div>
        <Tag className="!text-[14px] lg:!text-sm font-semibold bg-background_l dark:bg-background_d border-none overflow-hidden">
          <MarqueeText
            className="max-w-[280px]"
            text={'Nhà mặt phố, 3 tầng có ban công, sân thượng, ngõ ô tô có thể kinh doanh'}
          />
        </Tag>
      </div>
      <div className="overflow-hidden mt-2">
        <div className="text-base flex">
          16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886, 056272444,
          X3, nguồn ĐT10, 25 đến 35
        </div>
        <div className="gap-1 mt-2 flex">
          <div>Mô tả:</div>
          <Hashtag className="!mt-0" items={post?.tags} onHashtagClick={props.onHashtagClick} />
        </div>
      </div>
    </>
  );
};
