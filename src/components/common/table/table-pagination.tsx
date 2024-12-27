'use client';

import { Pagination } from 'antd';
import { useCallback } from 'react';

export type TablePaginationProps = {
  total: number;
  current: number;
  pageSize: number;
  align?: 'center' | 'end' | 'start';
  size?: 'default' | 'small';
  className?: string;
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30];

export const TablePagination = ({
  total,
  current,
  pageSize,
  align = 'end',
  size = 'default',
  className,
}: TablePaginationProps) => {
  const changePage = useCallback((param: string, page: number) => {
    const url = new URLSearchParams(window.location.search);
    url.set(param, String(page));

    const newUrl = `${window.location.pathname}?${url.toString()}`;
    history.replaceState(null, '', newUrl);
  }, []);

  return (
    <Pagination
      size={size}
      align={align}
      total={total}
      current={current}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      pageSize={pageSize}
      showSizeChanger
      onChange={(page, _) => {
        // Changing the page currently ('page')
        changePage('page', page);
      }}
      onShowSizeChange={(_, pageSize) => {
        // Change the page size ('limit')
        changePage('limit', pageSize);
      }}
      className={`mt-6 ${className}`}
    />
  );
};
