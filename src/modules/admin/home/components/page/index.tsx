import { Segmented, SegmentedOptionProps } from '@/components/reuse/data-display';
import { OnlAccount } from '../onl-account';
import { RoomStats } from '../room-stats';

const TABS: SegmentedOptionProps[] = [
  {
    label: 'Tài khoản online',
    value: 'onl-account',
    component: <OnlAccount />,
  },
  {
    label: 'Thống kê phòng',
    value: 'room-stats',
    component: <RoomStats />,
  },
];

export const AdminHomeIndex = () => {
  return (
    <div className="pr-3 pt-5">
      <Segmented options={TABS} />
    </div>
  );
};
