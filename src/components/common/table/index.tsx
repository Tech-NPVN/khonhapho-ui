'use client';

import useDragScroll from '@/hooks/use-drag-scroll';
import { Table as DataTable, TableProps as DataTableProps } from 'antd';
import { TablePagination, TablePaginationProps } from './table-pagination';

type TableHelperProps = Omit<DataTableProps, 'columns' | 'dataSource' | 'className' | 'pagination'>;
type TableProps<TValues extends Record<string, any>> = {
  columns: DataTableProps<TValues>['columns'];
  dataSource: TValues[];
  className?: string;
  paginationProps?: TablePaginationProps;
} & TableHelperProps;

export const Table = <TValues extends Record<string, any>>({
  columns,
  dataSource,
  className,
  paginationProps,
  ...props
}: TableProps<TValues>) => {
  const dragScrollHandlers = useDragScroll();

  return (
    <div className={`mt-6 ${className}`}>
      <div
        {...dragScrollHandlers}
        className="overflow-x-auto overflow-y-hidden"
        style={{ cursor: dragScrollHandlers.cursor }}
      >
        <DataTable
          dataSource={dataSource}
          columns={columns}
          tableLayout="auto"
          size="small"
          pagination={false}
          {...props}
          // rowClassName={(_, index) =>
          //   index % 2 === 0
          //     ? 'bg-primary_color_l dark:bg-primary_color_d'
          //     : 'bg-background_l_2 dark:bg-background_d'
          // }
        />
      </div>

      {paginationProps && <TablePagination {...paginationProps} />}
    </div>
  );
};
