import { SegmentedOptionProps } from '@/components/reuse/data-display';
import { Button, Empty, Input, Popover, Segmented } from 'antd';
import { useCallback, useState } from 'react';
import { PopoverProps } from '../layout.type';
import { PenEditIcon, SearchIcon } from '@/components/icons';

const MESSAGE_TABS = (value: string): SegmentedOptionProps[] => {
  return [
    {
      label: 'Nhóm chat',
      value: 'chat-group',
      component: <MessageTab status={value} />,
    },
    {
      label: 'Nhóm mặc định',
      value: 'chat-default',
      component: <MessageTab status={value} />,
    },
  ];
};

const MessageTab = ({ status }: { status: string }) => {
  return <Empty description="Chưa có tin nhắn!" className="my-5" />;
};

export const PopoverMessage = ({ children, open, setOpen }: PopoverProps) => {
  const [value, setValue] = useState<string>(MESSAGE_TABS('chat-group')[0].value);

  const renderContent = useCallback(() => {
    return (
      <div className="px-1 w-80">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-3">Đoạn chat</h3>
          <Button icon={<PenEditIcon />} type="text" />
        </div>

        <Input
          placeholder="Tìm kiếm ..."
          suffix={<SearchIcon />}
          className="mb-4 rounded-full h-9 border-0 !bg-secondary_text_d dark:!bg-primary_color_d"
        />

        <Segmented options={MESSAGE_TABS(value)} value={value} onChange={setValue} block />

        {MESSAGE_TABS(value).find((option) => option.value === value)?.component}
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
};
