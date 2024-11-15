'use client';

import { Segmented, SegmentedOptionProps } from '@/components/reuse/data-display';
import { OnlAccount } from './onl-account';
import { DepartmentStats } from './department-stats';

const TABS: SegmentedOptionProps[] = [
  {
    label: 'Tài khoản Online',
    value: 'onl-account',
    component: <OnlAccount />,
  },
  {
    label: 'Thống kê phòng',
    value: 'room-stats',
    component: <DepartmentStats />,
  },
];

export const AdminHomeIndex = () => {
  return (
    <div className="pt-4 lg:pr-4">
      <Segmented options={TABS} wrapperCn='max-lg:px-4' />
    </div>
  );
};
