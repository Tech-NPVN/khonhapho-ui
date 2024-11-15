'use client';

import { PostDetailTypes } from '@/components/reuse/data-display';
import { CardBody, CardFooter, CardHeader } from './comon.card';

export type AdminFeedsCardProps = {
  status?: 'pending' | 'approved' | 'rejected';
  post?: PostDetailTypes;
  className?: string;
  classNames?: {
    header?: string;
    body?: string;
    footer?: string;
  };
  events?: {
    onHashTagClick?: (tag: string) => void;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    onDelete?: (id: string) => void;
  };
};

const AdminFeedsCard: React.FC<AdminFeedsCardProps> = ({
  post,
  status,
  className,
  classNames,
  events,
}) => {
  return (
    <div
      className={
        'w-full px-4 py-3 bg-white dark:bg-primary_color_d rounded-lg shadow-sm ' +
        (className ?? '')
      }
    >
      <CardHeader
        post={post}
        status={status}
        className={classNames?.header ?? ''}
        onApprove={events?.onApprove}
        onReject={events?.onReject}
        onDelete={events?.onDelete}
      />
      <CardBody
        className={classNames?.body ?? ''}
        post={post}
        contentMaxLine={7}
        onHashTagClick={(tag) => {
          events?.onHashTagClick?.(tag);
        }}
      />
      <CardFooter className={classNames?.footer ?? ''} />
    </div>
  );
};

export { AdminFeedsCard };
