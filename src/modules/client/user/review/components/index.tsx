'use client';

import { SectionBody } from '@/components/common';
import { SearchIcon } from '@/components/icons';
import { Input } from 'antd';
import { ReviewTable } from './review.table';

export const UserReviewIndex = () => {
  return (
    <>
      <div className="pt-4 lg:pr-4">
        <SectionBody title="Lịch sử báo cáo dẫn khách">
          <div className="flex w-full justify-end">
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={<SearchIcon className="w-4 h-4" />}
              className="w-[320px] max-sm:w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
            />
          </div>

          <ReviewTable />
        </SectionBody>
      </div>

      <></>
    </>
  );
};
