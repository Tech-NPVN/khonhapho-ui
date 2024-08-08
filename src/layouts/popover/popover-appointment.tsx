import { useCallback } from 'react';
import { PopoverProps } from '../layout.type';
import { Empty, Popover } from 'antd';

export const PopoverAppointment = ({ children, open, setOpen }: PopoverProps) => {
  const renderContent = useCallback(() => {
    return (
      <div className="px-1 w-72">
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
      placement="bottomRight"
    >
      {children}
    </Popover>
  );
};
