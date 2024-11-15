'use client';

import { Segmented, SegmentedOptionProps } from '@/components/reuse/data-display';
import { Schedule } from './schedule';

const TABS: SegmentedOptionProps[] = [
  {
    label: 'Lịch đào tạo',
    value: 'schedule',
    component: <Schedule />,
  },
  {
    label: 'Bài giảng',
    value: 'lesson',
    component: <>2</>,
  },
];

export const TrainingScheduleIndex = () => {
  return (
    <div className="pr-3 pt-5">
      <Segmented options={TABS} />
    </div>
  );
};
