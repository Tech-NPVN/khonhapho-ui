'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, CollapseIcon, ReloadDownIcon, SearchIcon } from '@/components/icons';
import { useSidebar } from '@/components/reuse/navigation';
import { Button, Col, Input, Row, Select, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import { ProvinceTable } from './province.table';
import { ProvinceForm } from './province.form';

const TITLE = 'Quản lý tỉnh';

export const ProvinceIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { collapsed, toggleCollapse } = useSidebar();

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
          <span>{TITLE}</span>
        </div>
      );
    }

    return TITLE;
  }, [collapsed, toggleCollapse]);

  const renderAddButton = useCallback(() => {
    return (
      <Button
        icon={<AddIcon className="mr-1" />}
        type="primary"
        className="px-5 max-lg:text-[13px]"
        onClick={() => setOpenCreate(true)}
        size="large"
      >
        Thêm mới
      </Button>
    );
  }, []);

  return (
    <>
      <SectionBodyWithDescButton title={renderTitle()} btn={renderAddButton()}>
        <Row gutter={[6, 6]}>
          <Col span={6}>
            <Input
              size="large"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={<SearchIcon className="w-4 h-4" />}
              className="w-full"
            />
          </Col>
          <Col span={6}>
            <Select
              size="large"
              className="w-full"
              placeholder="Khu vực"
              options={[]}
              fieldNames={{ label: 'name', value: 'id' }}
              showSearch
              optionFilterProp="name"
              allowClear
            />
          </Col>
          <Col span={6}>
            <Button
              icon={<ReloadDownIcon />}
              size="large"
              className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d"
            >
              Làm mới
            </Button>
          </Col>
        </Row>

        <ProvinceTable />
      </SectionBodyWithDescButton>

      <ProvinceForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
