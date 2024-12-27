'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { PaginationRequest } from './table-model';

type UseFilterPagination = {
  page: string | null;
  limit: string | null;
};

const PAGE = 1;
const LIMIT = 10;

export const useFilterPagination = (): UseFilterPagination => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  useEffect(() => {
    if (!page || !limit) {
      const url = new URLSearchParams(window.location.search);

      Object.entries(new PaginationRequest(PAGE, LIMIT)).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        url.append(key, value as string);
      });

      const newUrl = `${window.location.pathname}?${url.toString()}`;
      history.replaceState(null, '', newUrl);
    }
  }, [limit, page]);

  return { page, limit };
};
