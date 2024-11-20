'use client';

import { Segmented, SegmentedOptionProps } from '@/components/reuse/data-display';
import { Breakpoint } from '@/constants/enums';
import { useWindowSize } from 'react-use';
import { LessionComponent } from './lessions/lession';
import { Schedule } from './schedule/schedule';

const TABS: SegmentedOptionProps[] = [
  {
    label: 'Lịch đào tạo',
    value: 'schedule',
    component: <Schedule />,
  },
  {
    label: 'Bài giảng',
    value: 'lesson',
    component: <LessionComponent />,
  },
];

export const TrainingScheduleIndex = () => {
  const { width } = useWindowSize();
  return (
    <div className="px-3 lg:ps-0 pt-5 sm:[&_.ant-segmented-item]:min-w-[200px]">
      <Segmented block={width < Breakpoint.Md} options={TABS} />
    </div>
  );
};
