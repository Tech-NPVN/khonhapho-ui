'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import UrgentlyPendingIndex from './urgently-pending';
import UrgentlyApprovedIndex from './urgently-approved';
import UrgentlyRejectIndex from './urgently-reject';
import { Button, Segmented, Tooltip } from 'antd';
import { useCallback } from 'react';
import { CollapseIcon } from '@/components/icons';
import { useFeeds } from '../../context';

const URGENTLY_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={100} />,
    value: 'pending',
    component: <UrgentlyPendingIndex />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2} />,
    value: 'approved',
    component: <UrgentlyApprovedIndex />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={1232} />,
    value: 'reject',
    component: <UrgentlyRejectIndex />,
  },
];

export const UrgentlyIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();
  const { value, handleChange } = useSegmented(URGENTLY_TABS);

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
          <span>Duyệt tin khách cần mua gấp</span>
        </div>
      );
    }

    return 'Duyệt tin khách cần mua gấp';
  }, [collapsed, toggleCollapse]);

  return (
    <>
      <SectionBody title={renderTitle()}>
        <Segmented
          options={URGENTLY_TABS}
          value={value}
          onChange={handleChange}
          className="dark:!bg-background_d"
        /> 
      </SectionBody>
      <div className="rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 mt-5">
        {URGENTLY_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
