'use client';

import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Input, Segmented, Select, Tooltip } from 'antd';
import { CollapseIcon, SearchIcon } from '@/components/icons';
import { SectionBody, TabLabelWithBadge } from '@/components/common';
import LibAssistPendingIndex from './lib-assist-pending';
import LibAssistApprovedIndex from './lib-assist-approved';
import LibAssistRejectIndex from './lib-assist-reject';

const LIB_ASSIST_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={23} />,
    value: 'pending',
    component: <LibAssistPendingIndex />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={1} />,
    value: 'approved',
    component: <LibAssistApprovedIndex />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={2322} />,
    value: 'reject',
    component: <LibAssistRejectIndex />,
  },
];

export const LibAssistIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();
  const { value, handleChange } = useSegmented(LIB_ASSIST_TABS);

  const renderTitle = useCallback(() => {
    if (collapsed) {
      return (
        <div className="flex items-center gap-3">
          <Tooltip title="Mở rộng" placement="bottom">
            <Button
              type="text"
              icon={<CollapseIcon className="rotate-180" />}
              onClick={toggleCollapse}
            />
          </Tooltip>
          <span>Duyệt tin thư viện trợ lý</span>
        </div>
      );
    }

    return 'Duyệt tin thư viện trợ lý';
  }, [collapsed, toggleCollapse]);

  return (
    <>
      <SectionBody title={renderTitle()}>
        <div className="flex justify-between ">
          <Segmented
            options={LIB_ASSIST_TABS}
            value={value}
            onChange={handleChange}
            className="dark:!bg-background_d"
          />
          <div className="flex items-center gap-4">
            <Select placeholder="Danh mục" size="large" className="w-64" />
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              suffix={<SearchIcon className="w-4 h-4" />}
              className="w-64 rounded-xl dark:bg-transparent"
            />
          </div>
        </div>
      </SectionBody>
      
      <div className="rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 mt-5">
        {LIB_ASSIST_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
