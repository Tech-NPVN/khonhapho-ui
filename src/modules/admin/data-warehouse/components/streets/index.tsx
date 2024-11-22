'use client';

import { SectionBodyWithDescButton } from '@/components/common';
import { AddIcon, CollapseIcon, ReloadDownIcon, SearchIcon } from '@/components/icons';
import { useSidebar } from '@/components/reuse/navigation';
import { Navigations } from '@/constants/enums';
import useFetchLocation from '@/hooks/use-fetch-location';
import { Button, Col, Input, Row, Select, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { StreetsTable } from './streets.table';
import { StreetsForm } from './streets.form';

const TITLE = Navigations.DataWarehouseStreets;

export const StreetsIndex = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { collapsed, toggleCollapse } = useSidebar();
  const { cities, districts, fetchCities, fetchDistricts, setDistricts } = useFetchLocation();

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
      >
        Thêm mới
      </Button>
    );
  }, []);

  useEffect(() => {
    if (cities.length === 0) fetchCities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              placeholder="Chọn thành phố"
              options={cities}
              fieldNames={{ label: 'name', value: 'id' }}
              showSearch
              optionFilterProp="name"
              onChange={(value: number) => {
                if (value) {
                  fetchDistricts(value);
                } else {
                  setDistricts([]);
                }
              }}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Select
              size="large"
              className="w-full"
              placeholder="Chọn Quận/Huyện"
              options={districts}
              fieldNames={{ label: 'name', value: 'id' }}
              showSearch
              optionFilterProp="name"
              disabled={districts.length === 0}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Button
              icon={<ReloadDownIcon />}
              size="large"
              className="w-full bg-transparent dark:bg-background_d dark:border-0 dark:text-primary_text_d"
            >
              Đặt lại
            </Button>
          </Col>
        </Row>

        <StreetsTable />
      </SectionBodyWithDescButton>

      <StreetsForm open={openCreate} onClose={() => setOpenCreate(false)} />
    </>
  );
};
