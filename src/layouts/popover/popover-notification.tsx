import { useCallback } from 'react';
import { PopoverProps } from '../layout.type';
import { Popover } from 'antd';

export const PopoverNotification = ({ children, open, setOpen }: PopoverProps) => {
  const renderContent = useCallback(() => {
    return <></>;
  }, []);

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
};
