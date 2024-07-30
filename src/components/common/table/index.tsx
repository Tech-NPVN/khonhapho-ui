import { Col, Popover, Row, Switch, type TableProps } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useHiddenColumns = <T,>(columns: TableProps<T>['columns']) => {
  const defaultCheckedList = columns?.map((item) => item.key as string);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns?.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns?.map((item) => ({
    ...item,
    hidden: !checkedList?.includes(item.key as string),
  }));
};

type PopoverHiddenColumnsProps<T> = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  columns: TableProps<T>['columns'];
  children: React.ReactNode;
  className?: string;
  title?: string;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
  placement?: TooltipPlacement;
};

const PopoverHiddenColumns = <T,>({
  open,
  setOpen,
  columns,
  children,
  className,
  ...props
}: PopoverHiddenColumnsProps<T>) => {
  const renderContent = useCallback(() => {
    return (
      <Row gutter={[10, 10]} className="w-72">
        {columns?.map((column) => (
          <Col span={12} key={column.key}>
            <div className="flex items-center gap-3">
              <Switch size="small" onChange={(value) => console.log(value)} />
              <span>{column.title?.toString()}</span>
            </div>
          </Col>
        ))}
      </Row>
    );
  }, [columns]);

  return (
    <Popover open={open} content={renderContent()} onOpenChange={setOpen} {...props}>
      {children}
    </Popover>
  );
};

export { useHiddenColumns, PopoverHiddenColumns };
