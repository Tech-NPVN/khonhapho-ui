'use client';
import { Routes } from '@/constants/enums';
import { getTimeAgo } from '@/utilities/func.time';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useMeasure } from 'react-use';
import EventThreeDot from './event-three-dot';

const EventAvatar = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  return (
    <div ref={ref} className="flex w-full">
      <div>
        <Image
          className={clsx('rounded-full', width < 480 ? 'w-9 h-9 mr-1' : 'w-10 h-10 mr-3')}
          width={40}
          height={40}
          src="/images/user-default.jpg"
          alt="User"
        />
      </div>
      <div className="mb-3 w-full">
        <div className="flex justify-between">
          <Link
            className={clsx(
              'font-semibold text-primary_text_l dark:text-primary_text_d text-base line-clamp-1 hover:underline',
              width < 480 ? 'text-sm' : 'text-base',
            )}
            href={Routes.User + '/' + 'id'}
          >
            Nhà Phố Việt Nam
          </Link>
          <EventThreeDot />
        </div>
        <span
          className={clsx('gap-[10px] flex text-primary_text_l/50 dark:text-primary_text_d/50')}
        >
          <span>{getTimeAgo()}</span>
          {/* <span>•</span>
          <span>Danh mục</span> */}
        </span>
      </div>
    </div>
  );
};

export default EventAvatar;
