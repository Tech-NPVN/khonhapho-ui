import { memo, useCallback } from 'react';
import { PopoverProps } from '../layout.type';
import { Empty, Popover } from 'antd';
import { useWindowSize } from 'react-use';
import { Breakpoint } from '@/constants/enums';

export const PopoverAppointment = memo(({ children, open, setOpen }: PopoverProps) => {
  const windows = useWindowSize();

  const renderContent = useCallback(() => {
    return (
      <div className="px-1 sm:w-72">
        <h3 className="text-xl font-bold mb-3">Lịch hẹn dẫn khách</h3>
        <Empty description="Chưa có lịch hẹn!" className="my-5" />
      </div>
    );
  }, []);

  return (
    <Popover
      open={open}
      content={renderContent()}
      onOpenChange={setOpen}
      trigger="click"
      overlayStyle={{
        width: windows.width < Breakpoint.Sm ? '100vw' : 'auto',
      }}
      placement={windows.width < Breakpoint.Sm ? 'bottom' : 'bottomRight'}
    >
      {children}
    </Popover>
  );
});

PopoverAppointment.displayName = Popover.name;
