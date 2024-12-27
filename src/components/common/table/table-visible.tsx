'use client';

import { ReloadDownIcon } from '@/components/icons';
import { Button, Col, message, Popover, Row, Switch, type TableProps } from 'antd';
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

  const resetColumnVisibility = useCallback(() => {
    setColumnsVisibility(
      initialColumns!.reduce((acc, column) => {
        acc[column.key as string] = true;
        return acc;
      }, {} as Record<string, boolean>),
    );
  }, [initialColumns]);

  const hiddenColumnsCount = useMemo(
    () => initialColumns!.length - visibleColumns.length,
    [initialColumns, visibleColumns.length],
  );

  return {
    columnsVisibility,
    toggleColumnVisibility,
    visibleColumns,
    hiddenColumnsCount,
    resetColumnVisibility,
  };
};

type PopoverVisibilityColumnsProps<T> = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  columns: TableProps<T>['columns'];
  columnsVisibility: Record<string, boolean>;
  toggleColumnVisibility: (key: string, visible: boolean) => void;
  resetColumnVisibility: () => void;
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
  resetColumnVisibility,
  children,
  className,
  ...props
}: PopoverVisibilityColumnsProps<T>) => {
  const [messageApi, contextHolder] = message.useMessage();

  const visibleColumnCount = Object.values(columnsVisibility).filter(Boolean).length;

  const renderContent = useCallback(() => {
    return (
      <Row gutter={[10, 10]} className="w-72">
        {columns?.map((column) => (
          <Col span={12} key={column.key}>
            <div className="flex items-center gap-3">
              <Switch
                size="small"
                checked={columnsVisibility[column.key as string]}
                onChange={(value) => {
                  if (visibleColumnCount <= 1 && !value) {
                    messageApi.info('Cần ít nhất 1 cột để hiển thị.');
                    return;
                  }
                  toggleColumnVisibility(column.key as string, value);
                }}
              />
              <span className="dark:text-primary_text_d">{column.title?.toString()}</span>
            </div>
          </Col>
        ))}
        {visibleColumnCount < columns!.length && (
          <Col span={24}>
            <Button
              onClick={resetColumnVisibility}
              className="w-full mt-3"
              type="primary"
              icon={
                <ReloadDownIcon width="14" height="14" className="[&>path]:fill-primary_color_l" />
              }
            >
              Đặt lại
            </Button>
          </Col>
        )}
      </Row>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, columnsVisibility, toggleColumnVisibility]);

  return (
    <>
      {contextHolder}
      <Popover open={open} content={renderContent()} onOpenChange={setOpen} {...props}>
        {children}
      </Popover>
    </>
  );
};

export { useColumnVisibility, PopoverVisibilityColumns };
