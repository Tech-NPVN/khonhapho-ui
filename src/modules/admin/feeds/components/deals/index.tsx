'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Tooltip, Segmented } from 'antd';
import { CollapseIcon } from '@/components/icons';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import DealsRejectIndex from './deals-reject/page';
import DealsApprovedIndex from './deals-approved';
import DealsPendingIndex from './deals-pending/page';

const DEAL_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={2} />,
    value: 'pending',
    component: <DealsPendingIndex />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2002} />,
    value: 'approved',
    component: <DealsApprovedIndex />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={17902} />,
    value: 'reject',
    component: <DealsRejectIndex />,
  },
];

export const DealsIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();
  const { value, handleChange } = useSegmented(DEAL_TABS);

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
          <span>Duyệt vụ chốt</span>
        </div>
      );
    }

    return 'Duyệt vụ chốt';
  }, [collapsed, toggleCollapse]);

  return (
    <>
      <SectionBody title={renderTitle()}>
        <Segmented
          options={DEAL_TABS}
          value={value}
          onChange={handleChange}
          className="dark:!bg-background_d"
        />
      </SectionBody>
      <div className="rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 mt-5">
        {DEAL_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
