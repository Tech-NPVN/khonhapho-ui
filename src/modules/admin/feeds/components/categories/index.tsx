'use client';

import { TrainingFeedCategoryModal } from '@/common/modal';
import { SectionBody } from '@/components/common';
import { AddIcon, CollapseIcon } from '@/components/icons';
import { useSidebar } from '@/components/reuse/navigation';
import { Button, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import { CategoriesSearch } from './categories.search';
import { CategoriesTable } from './categories.table';

export const CategoriesIndex = () => {
  const { collapsed, toggleCollapse } = useSidebar();
  const [modalVisible, setModalVisible] = useState(false);
  const renderTitle = useCallback(() => {
    if (collapsed) {
      return (
        <>
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Tooltip title="Mở rộng" placement="bottom">
                <Button
                  type="text"
                  icon={<CollapseIcon className="rotate-180" />}
                  onClick={toggleCollapse}
                />
              </Tooltip>
              <span>Danh mục feed đào tạo</span>
            </div>
            <div>
              <Button type="primary" icon={<AddIcon />} onClick={() => setModalVisible(true)}>
                Thêm mới
              </Button>
            </div>
          </div>
          <TrainingFeedCategoryModal open={modalVisible} onClose={() => setModalVisible(false)} />
        </>
      );
    }

    return (
      <>
        <div className="flex items-center justify-between">
          <span>Danh mục feed đào tạo</span>
          <Button type="primary" icon={<AddIcon />} onClick={() => setModalVisible(true)}>
            Thêm mới
          </Button>
        </div>
        <TrainingFeedCategoryModal open={modalVisible} onClose={() => setModalVisible(false)} />
      </>
    );
  }, [collapsed, modalVisible, toggleCollapse]);

  return (
    <SectionBody title={renderTitle()}>
      <CategoriesSearch />
      <CategoriesTable />
    </SectionBody>
  );
};
