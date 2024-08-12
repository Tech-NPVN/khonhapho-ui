import { memo, useCallback, useState } from 'react';
import { PopoverProps } from '../layout.type';
import { Empty, Popover, Segmented } from 'antd';
import { SegmentedOptionProps } from '@/components/reuse/data-display';

const NOTIFICATION_TABS = (value: string): SegmentedOptionProps[] => {
  return [
    {
      label: 'Tất cả',
      value: 'all',
      component: <NotificationTab status={value} />,
    },
    {
      label: 'Chưa đọc',
      value: 'no-read',
      component: <NotificationTab status={value} />,
    },
    {
      label: 'Quan trọng',
      value: 'important',
      component: <NotificationTab status={value} />,
    },
  ];
};

const NotificationTab = ({ status }: { status: string }) => {
  return <Empty description="Chưa có thông báo!" className="mb-5" />;
};

export const PopoverNotification = memo(({ children, open, setOpen }: PopoverProps) => {
  const [value, setValue] = useState<string>(NOTIFICATION_TABS('all')[0].value);

  const renderContent = useCallback(() => {
    return (
      <div className="px-1 w-96">
        <h3 className="text-xl font-bold mb-3">Thông báo</h3>
        <Segmented options={NOTIFICATION_TABS(value)} value={value} onChange={setValue} block />

        <div className="flex justify-between items-center py-4">
          <button className="border-0 bg-transparent p-0 text-link_text_l dark:text-link_text_d cursor-pointer">
            Đánh dấu đọc tất cả
          </button>
          <button className="border-0 bg-transparent p-0 text-link_text_l dark:text-link_text_d cursor-pointer">
            Xem tất cả
          </button>
        </div>

        {NOTIFICATION_TABS(value).find((option) => option.value === value)?.component}
      </div>
    );
  }, [value]);

  return (
    <Popover
      open={open}
      content={renderContent()}
      onOpenChange={setOpen}
      placement="bottomRight"
      trigger="click"
    >
      {children}
    </Popover>
  );
});

PopoverNotification.displayName = Popover.name;
