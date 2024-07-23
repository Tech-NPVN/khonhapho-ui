'use client';

import { SectionBody } from '@/components/common';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Tooltip, Segmented as SegmentedAntd } from 'antd';
import { CollapseIcon } from '@/components/icons';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';

const DEAL_TABS: SegmentedOptionProps[] = [
  {
    label: 'Chờ duyệt',
    value: 'pending',
    component: <>1</>,
  },
  {
    label: 'Đã duyệt',
    value: 'approved',
    component: <>2</>,
  },
  {
    label: 'Đã duyệt',
    value: 'reject',
    component: <>3</>,
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
        <SegmentedAntd options={DEAL_TABS} value={value} onChange={handleChange} />
      </SectionBody>
      <div className="rounded-lg bg-primary_color_l dark:bg-primary_color_d px-4 py-5 mt-5">
        {DEAL_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
