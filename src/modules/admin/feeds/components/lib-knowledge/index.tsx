'use client';

import { SectionBody, TabLabelWithBadge } from '@/components/common';
import { SegmentedOptionProps, useSegmented } from '@/components/reuse/data-display';
import LibKnowledgePendingIndex from './lib-knowledge-pending';
import LibKnowledgeApprovedIndex from './lib-knowledge-approved';
import LibKnowledgeRejectIndex from './lib-knowledge-reject';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Input, Segmented, Select, Tooltip } from 'antd';
import { CollapseIcon, SearchIcon } from '@/components/icons';

const LIB_KNOWLEDGE_TABS: SegmentedOptionProps[] = [
  {
    label: <TabLabelWithBadge title="Chờ duyệt" count={10} />,
    value: 'pending',
    component: <LibKnowledgePendingIndex />,
  },
  {
    label: <TabLabelWithBadge title="Đã duyệt" count={100} />,
    value: 'approved',
    component: <LibKnowledgeApprovedIndex />,
  },
  {
    label: <TabLabelWithBadge title="Từ chối" count={204} />,
    value: 'reject',
    component: <LibKnowledgeRejectIndex />,
  },
];

export const LibKnowledgeIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();
  const { value, handleChange } = useSegmented(LIB_KNOWLEDGE_TABS);

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
          <span>Duyệt tin thư viện kiến thức</span>
        </div>
      );
    }

    return 'Duyệt tin thư viện kiến thức';
  }, [collapsed, toggleCollapse]);

  return (
    <>
      <SectionBody title={renderTitle()}>
        <div className="flex justify-between ">
          <Segmented
            options={LIB_KNOWLEDGE_TABS}
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
        {LIB_KNOWLEDGE_TABS.find((option) => option.value === value)?.component}
      </div>
    </>
  );
};
