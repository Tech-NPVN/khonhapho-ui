'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import SkillPendingIndex from './skill-pending';
import SkillApprovedIndex from './skill-approved';
import SkillRejectIndex from './skill-reject';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Input, Segmented, Select, Tooltip } from 'antd';
import { CollapseIcon, SearchIcon } from '@/components/icons';

const SKILL_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={1} />,
    value: 'pending',
    component: <SkillPendingIndex />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={2} />,
    value: 'approved',
    component: <SkillApprovedIndex />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={3} />,
    value: 'reject',
    component: <SkillRejectIndex />,
  },
];

export const SkillIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();
  const { value, handleChange } = useSegmented(SKILL_TABS);

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
          <span>Duyệt tin chia sẻ kỹ năng</span>
        </div>
      );
    }

    return 'Duyệt tin chia sẻ kỹ năng';
  }, [collapsed, toggleCollapse]);

  return (
    <>
      <SectionBody title={renderTitle()}>
        <div className="flex justify-between ">
          <Segmented
            options={SKILL_TABS}
            value={value}
            onChange={handleChange}
            className="dark:!bg-background_d"
          />
          <div className="flex items-center gap-4">
            <Select placeholder="Chi nhánh" size="large" className="w-64" />
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
        {SKILL_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
