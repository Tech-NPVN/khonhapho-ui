'use client';

import { SectionBody } from '@/components/common';
import { DepartmentStatsSearch } from './department-stats.search';
import { DepartmentStatsTable } from './department-stats.table';

export const DepartmentStats = () => {
  return (
    <div className="mt-5">
      <SectionBody title="Thống kê số lượng nhân sự các phòng">
        <DepartmentStatsSearch />
        <DepartmentStatsTable />
      </SectionBody>
    </div>
  );
};
