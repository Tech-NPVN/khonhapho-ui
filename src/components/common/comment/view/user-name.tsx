'use client';

import { Routes } from '@/constants/enums';
import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';
import { useMeasure } from 'react-use';

type CommentUserNameProps = {
  name: string;
  className?: string;
  id: number | string;
  department?: string;
  department_id?: number | string;
};
/** Tên người bình luận */
const CommentUserName: React.FC<CommentUserNameProps> = memo(
  ({ id, name, department, className, department_id }) => {
    const [rootRef, { width: rootWidth }] = useMeasure<HTMLDivElement>();
    const isMobile = rootWidth < 481;
    return (
      <div ref={rootRef} className="flex group comment-username ">
        <Link
          className={clsx(
            'flex gap-2 items-center group-[&_.link]:hover:underline text-black font-medium line-clamp-1 text-nowrap dark:text-primary_text_d',
            isMobile ? 'gap-1 text-sm' : 'gap-2 text-base',
            className,
          )}
          href={`${Routes.User}/${id}`}
        >
          <span className="link">{name ?? 'Lỗi hiển thị tên'}</span>
          {department && <span>•</span>}
          {department && <span className="link">{department}</span>}
        </Link>
      </div>
    );
  },
);

CommentUserName.displayName = 'CommentUserName';

export { CommentUserName };
