'use client';

import { TabLabelWithBadge } from '@/components/common';
import { ReloadDownIcon } from '@/components/icons';
import { SearchInput } from '@/components/reuse/data-entry/input';
import { Button, Select } from 'antd';
import { SegmentedOptions } from 'antd/es/segmented';
import { Segmented } from 'antd/lib';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import { selectFilterOption } from './helper';

const options = [
  {
    icon: null,
    value: 'active',
    label: 'Đang hợp tác',
  },
  {
    icon: null,
    value: 'expiring_soon',
    label: 'Sắp hết hạn',
  },
  {
    icon: null,
    value: 'locked',
    label: 'Đã khoá',
  },
  {
    icon: null,
    value: 'inactive',
    label: 'Chưa kích hoạt',
  },
];

type FilterType = {
  search?: string;
  role?: string;
  branch?: string;
  department?: string;
  tab?: string;
};
export type UsersHeaderProps = {
  onFilterChange?: (value: FilterType) => void;
};
// TabLabelWithBadge
/** (Component) phần lọc ở trang thành viên */
const UsersHeader: React.FC<UsersHeaderProps> = ({ onFilterChange }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [tabs, setTabs] = useState<SegmentedOptions>(options);
  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState<FilterType>({});
  const handleFilterChange = useCallback(
    (value: FilterType) => {
      onFilterChange?.({ ...value, tab: value.tab ?? 'active' });
      setFilter(value);
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('tab', value.tab ?? 'active');
      value.role ? currentParams.set('role', value.role ?? '') : currentParams.delete('role');
      value.search
        ? currentParams.set('search', value.search ?? '')
        : currentParams.delete('search');
      value.branch
        ? currentParams.set('branch', value.branch ?? '')
        : currentParams.delete('branch');
      value.department
        ? currentParams.set('department', value.department ?? '')
        : currentParams.delete('department');
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
      history.replaceState(null, '', newUrl);
    },
    [onFilterChange],
  );
  useEffect(() => {
    const newTab = options.map((tab) => ({
      ...tab,
      label: <TabLabelWithBadge title={tab.label} count={Math.floor(Math.random() * 100)} />,
    }));
    setTabs(newTab);
    const currentParams = new URLSearchParams(window.location.search);
    const tab = currentParams.get('tab') || undefined;
    const role = currentParams.get('role') || undefined;
    const search = currentParams.get('search') || undefined;
    const branch = currentParams.get('branch') || undefined;
    const department = currentParams.get('department') || undefined;
    handleFilterChange({ tab, search, role, branch, department });
  }, [handleFilterChange]);

  const maxWidth920 = width < 920 && width >= 640;
  const maxWidth640 = width < 640;
  return (
    <div ref={ref} className="bg-white p-4 rounded-lg flex flex-col gap-3 dark:bg-primary_color_d">
      <div className={clsx('flex flex-wrap')}>
        <div className={clsx('mb-3', maxWidth920 ? 'w-full' : 'w-3/4')}>
          <div className={clsx(maxWidth920 ? 'w-full' : 'w-[700px]')}>
            <Segmented
              block
              value={filter.tab ?? 'active'}
              options={tabs}
              onChange={(value) => {
                handleFilterChange({ ...filter, tab: value as string });
              }}
            />
          </div>
        </div>
        {/* Thanh tìm kiếm */}
        <div
          className={clsx(
            maxWidth920 ? 'w-1/2 pr-[6px]' : maxWidth640 ? 'w-full mt-3' : 'w-1/4 ps-3',
          )}
        >
          <SearchInput
            value={searchString}
            onChange={(text) => {
              setSearchString(text);
            }}
            onSearch={(value) => handleFilterChange({ ...filter, search: value })}
            onClear={() => {
              setSearchString('');
            }}
            className={clsx('!rounded-lg', maxWidth920 || maxWidth920 ? 'h-10' : 'h-11')}
          />
        </div>
        {/* Chức danh */}
        <div
          className={clsx(
            maxWidth920 ? 'w-1/2 ps-[6px]' : maxWidth640 ? 'w-full mt-3' : 'flex-1 pr-[8px]',
          )}
        >
          <Select
            showSearch
            value={filter.role}
            className="w-full h-10"
            placeholder="Chức danh"
            filterOption={selectFilterOption}
            onChange={(value) => handleFilterChange({ ...filter, role: value })}
          >
            <Select.Option value="0">Tất cả</Select.Option>
            <Select.Option value="1">Chuyên viên</Select.Option>
            <Select.Option value="2">Giám sư</Select.Option>
          </Select>
        </div>
        {/* Chi nhánh */}
        <div
          className={clsx(
            maxWidth920 ? 'w-1/2 pr-[6px] mt-3' : maxWidth640 ? 'w-full mt-3' : 'flex-1 px-[5px]',
          )}
        >
          <Select
            showSearch
            value={filter.branch}
            className="w-full h-10"
            placeholder="Chi nhánh"
            filterOption={selectFilterOption}
            onChange={(value) => handleFilterChange({ ...filter, branch: value })}
          >
            <Select.Option value="0">Tất cả</Select.Option>
            <Select.Option value="1">Chuyên viên</Select.Option>
            <Select.Option value="2">Giám sư</Select.Option>
          </Select>
        </div>
        {/* Phòng ban */}
        <div
          className={clsx(
            maxWidth920 ? 'w-1/2 ps-[6px] mt-3' : maxWidth640 ? 'w-full mt-3' : 'flex-1 ps-[8px]',
          )}
        >
          <Select
            showSearch
            className="w-full h-10"
            placeholder="Phòng ban"
            disabled={!filter.branch}
            value={filter.department}
            filterOption={selectFilterOption}
            onChange={(value) => handleFilterChange({ ...filter, department: value })}
          >
            <Select.Option value="0">Tất cả</Select.Option>
            <Select.Option value="1">Chuyên viên</Select.Option>
            <Select.Option value="2">Giám sư</Select.Option>
          </Select>
        </div>
        {/* Nút đặt lại */}
        <div
          className={clsx(
            'flex-1',
            maxWidth920 || maxWidth640 ? 'mt-3' : 'mt-0 ps-3',
            // Object.values(filter).some(
            //   (value) => value !== undefined && value !== null && value !== '',
            // )
            //   ? ''
            //   : 'hidden',
          )}
        >
          <Button
            className="w-full h-10 [&_path]:hover:fill-green-500 transition-none dark:bg-white/5"
            icon={<ReloadDownIcon className="w-4 h-4" />}
            onClick={() => {
              handleFilterChange({
                search: undefined,
                role: undefined,
                branch: undefined,
                department: undefined,
                tab: filter.tab,
              });
              setSearchString('');
            }}
          >
            Đặt lại
          </Button>
        </div>
      </div>
      <div>Tổng số thành viên: 9999</div>
    </div>
  );
};

export default UsersHeader;
