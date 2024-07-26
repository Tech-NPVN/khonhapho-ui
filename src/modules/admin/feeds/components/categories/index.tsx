'use client';

import { SectionBody } from '@/components/common';
import { useFeeds } from '../../context';
import { useCallback } from 'react';
import { Button, Tooltip } from 'antd';
import { CollapseIcon } from '@/components/icons';
import { CategoriesSearch } from './categories.search';
import { CategoriesTable } from './categories.table';

export const CategoriesIndex = () => {
  const { collapsed, toggleCollapse } = useFeeds();

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
          <span>Danh mục feed đào tạo</span>
        </div>
      );
    }

    return 'Danh mục feed đào tạo';
  }, [collapsed, toggleCollapse]);

  return (
    <SectionBody title={renderTitle()}>
      <CategoriesSearch />
      <CategoriesTable />
    </SectionBody>
  );
};
