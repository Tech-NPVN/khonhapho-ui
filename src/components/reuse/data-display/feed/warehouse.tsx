'use client';

import { MediaGallery } from '@/components/common/gallery';
import { UserConfirmStatusIcon } from '@/components/icons';
import { TriangleWarningIcon } from '@/components/icons/warning.icon';
import { Tag } from 'antd';
import clsx from 'clsx';
import { useMeasure } from 'react-use';
import { SuitableCustomer } from '../post/popup-group';
import { AvatarGroup } from './components/avatar';
import { FeedContent } from './components/content';
import { WarehouseHistory } from './components/history';
import { WarehouseInformation } from './components/warehouse-infomation';
import { FeedProps } from './type';

/**
 * Component nhỏ trong Feed
 */
export const Warehouse: React.FC<FeedProps> = ({ post }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  return (
    <>
      <div className="h-[40px] w-full mb-4">
        <div className="h-full w-full flex justify-between items-center px-3 sm:px-4">
          <WarehouseHistory post={post} />
        </div>
        <div className="w-full h-[1px] bg-background_l dark:bg-background_d"></div>
      </div>
      <div ref={ref} className="w-full px-3 sm:px-4">
        <div className="flex justify-between items-end relative">
          <AvatarGroup type="warehouse" />
        </div>
        <div className="mt-2">
          <WarehouseInformation post={post} />
        </div>
        <div className="mt-2">
          <FeedContent post={post} maxLineDisplay={3} />
        </div>
        <div className="mt-2 flex justify-between flex-wrap gap-2 w-full">
          <div className={'flex gap-2 items-center justify-between w-full'}>
            <Tag color="red">Có sổ đỏ - Thiếu Seri Sổ</Tag>
            <div>
              Mã số: <span className="text-link_text_l hover:underline">#18182</span>
            </div>
          </div>
          <div className={'flex gap-1 justify-between w-full'}>
            <button className="px-2 py-1 border-none bg-color_l dark:bg-color_l text-white rounded-md flex gap-2 cursor-pointer items-center">
              <UserConfirmStatusIcon
                width={14}
                height={18}
                className="!fill-white dark:!fill-white"
              />
              Xác nhận còn bán
            </button>
            <SuitableCustomer label="Khách phù hợp" />
          </div>
        </div>
        <div className="mt-2 p-1 gap-1 text-center border border-solid rounded-lg border-error_l dark:border-r-error_d flex items-center justify-center text-error_l dark:text-error_d text-base">
          <span>
            <TriangleWarningIcon
              width={18}
              height={16}
              className="fill-error_l dark:fill-error_d"
            />{' '}
            Cảnh báo: Đã 100 ngày chưa có tương tác. Đầu chủ chưa xác thực tình trạng còn bán.
          </span>
        </div>
      </div>

      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <MediaGallery
          mode={width < 640 ? 'feed' : 'grid'}
          media={post?.images?.map((img) => ({
            src: img,
            type: 'image',
          }))}
          configs={{
            grid: {
              maxMediaDisplay: width >= 888 || width <= 520 ? 5 : 4,
              imagePerRow: width >= 888 || width <= 520 ? 5 : 4,
            },
            feed: {
              maxMediaDisplay: 4,
            },
          }}
        />
      </div>
    </>
  );
};
