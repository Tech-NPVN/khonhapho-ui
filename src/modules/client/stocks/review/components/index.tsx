'use client';

import { SectionBody } from '@/components/common';
import { SearchIcon } from '@/components/icons';
import { Input } from 'antd';
import { StocksReviewTable } from './review.table';

export const StocksReviewIndex = () => {
  return (
    <div className="pt-4 lg:pr-4">
      <SectionBody title="Lịch sử Đầu khách báo cáo">
        <div className="flex w-full justify-end">
          <Input
            size="large"
            placeholder="Nhập nội dung tìm kiếm"
            prefix={<SearchIcon className="w-4 h-4" />}
            className="w-[320px] max-sm:w-full border-0 shadow-btn dark:!bg-background_d rounded-xl"
          />
        </div>

        <StocksReviewTable />
      </SectionBody>
    </div>
  );
};
