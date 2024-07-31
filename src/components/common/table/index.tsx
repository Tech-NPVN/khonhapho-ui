import { Col, Popover, Row, Switch, type TableProps } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

const useColumnVisibility = <T,>(initialColumns: TableProps<T>['columns']) => {
  const [columnsVisibility, setColumnsVisibility] = useState<Record<string, boolean>>(
    initialColumns!.reduce((acc, column) => {
      acc[column.key as string] = true;
      return acc;
    }, {} as Record<string, boolean>),
  );

  const toggleColumnVisibility = useCallback((key: string, visible: boolean) => {
    setColumnsVisibility((prev) => ({ ...prev, [key]: visible }));
  }, []);

  const visibleColumns = useMemo(() => {
    return initialColumns!.filter((column) => columnsVisibility[column.key as string]);
  }, [columnsVisibility, initialColumns]);

  const hiddenColumnsCount = useMemo(
    () => initialColumns!.length - visibleColumns.length,
    [initialColumns, visibleColumns.length],
  );

  return { columnsVisibility, toggleColumnVisibility, visibleColumns, hiddenColumnsCount };
};

type PopoverVisibilityColumnsProps<T> = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  columns: TableProps<T>['columns'];
  columnsVisibility: Record<string, boolean>;
  toggleColumnVisibility: (key: string, visible: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
  placement?: TooltipPlacement;
};

const PopoverVisibilityColumns = <T,>({
  open,
  setOpen,
  columns,
  columnsVisibility,
  toggleColumnVisibility,
  children,
  className,
  ...props
}: PopoverVisibilityColumnsProps<T>) => {
  const renderContent = useCallback(() => {
    return (
      <Row gutter={[10, 10]} className="w-72">
        {columns?.map((column) => (
          <Col span={12} key={column.key}>
            <div className="flex items-center gap-3">
              <Switch
                size="small"
                checked={columnsVisibility[column.key as string]}
                onChange={(value) => toggleColumnVisibility(column.key as string, value)}
              />
              <span>{column.title?.toString()}</span>
            </div>
          </Col>
        ))}
      </Row>
    );
  }, [columns, columnsVisibility, toggleColumnVisibility]);

  return (
    <Popover open={open} content={renderContent()} onOpenChange={setOpen} {...props}>
      {children}
    </Popover>
  );
};

export { useColumnVisibility, PopoverVisibilityColumns };
