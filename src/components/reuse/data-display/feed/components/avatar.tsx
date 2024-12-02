'use client';

import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import { Routes } from '@/constants/enums';
import { getTimeAgo } from '@/utilities/func.time';
import { Rate } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useMeasure } from 'react-use';
import { FeedProps } from '../type';
import { ThreeDot } from './three-dot';

export const AvatarGroup: React.FC<FeedProps> = ({ post, ...props }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  return (
    <div ref={ref} className={`w-full flex justify-between items-end relative ${props?.className}`}>
      {props.type === 'warehouse' ? (
        <div className="flex relative w-full">
          <div>
            <Image
              className={clsx('w-10 h-10 rounded-full mr-3', width < 480 ? '!mr-2' : '')}
              width={40}
              height={40}
              src="/images/user-default.jpg"
              alt="User"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between w-full">
              <Link
                className="font-semibold text-primary_text_l dark:text-primary_text_d hover:underline text-nowrap line-clamp-1 text-sm sm:text-base"
                href={Routes.User + '/' + 'id'}
              >
                <span>CV Nguyễn Trung</span>
                <span className="mx-[2px] sm:mx-1 md:sm:mx-2">•</span>
                <span>NPHN-1234</span>
              </Link>
            </div>
            <div className="text-secondary_text_l dark:text-primary_text_d flex justify-between">
              <div className={clsx('flex gap-[10px] items-center')}>
                <div className="flex">
                  <div className={clsx('', width < 480 ? '-mt-1' : '')}>
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={4.5}
                      className="[&_svg]:w-[10px] [&_svg]:h-[10px] sm:[&_svg]:w-3 sm:[&_svg]:h-3 [&_.ant-rate-star-first_svg]:fill-[#fbbc04] [&_.ant-rate-star-full_svg]:fill-[#fbbc04] [&>li]:me-1 [&_.ant-rate-star-first]:flex [&_.ant-rate-star-second]:flex"
                    />
                  </div>
                  <span className="text-primary_text_l dark:text-primary_text_d text-[12px] sm:text-sm flex items-center">
                    4,5
                  </span>
                </div>
                <span className="text-primary_text_l dark:text-primary_text_d hidden">•</span>
                <Link className="flex items-center w-3 h-3 sm:w-4 sm:h-4" href={'/messenger/id'}>
                  <MessengerKNPImage />
                </Link>
                <a
                  className="flex items-center w-3 h-3 sm:w-4 sm:h-4"
                  href="https://www.facebook.com/messages/t/1"
                  target="_blank"
                >
                  <MessengerImage />
                </a>
                <a
                  className="flex items-center w-3 h-3 sm:w-4 sm:h-4"
                  href="https://zalo.me/0389619050"
                  target="_blank"
                >
                  <ZaloImage />
                </a>
                <a className="flex items-center w-3 h-3 sm:w-4 sm:h-4" href="tel:0389619050">
                  <PhoneImage />
                </a>
              </div>
              <div className=" bg-background_l dark:bg-background_d flex items-center rounded">
                <span className="!text-[12px] font-semibold px-2 text-primary_text_l dark:text-primary_text_d">
                  Bán mạnh
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
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
            <Link
              className={clsx(
                'font-semibold text-primary_text_l dark:text-primary_text_d text-base line-clamp-1 hover:underline',
                width < 480 ? 'text-sm' : 'text-base',
              )}
              href={Routes.User + '/' + 'id'}
            >
              Nhà Phố Việt Nam
            </Link>
            <span
              className={clsx('gap-[10px] flex text-primary_text_l/50 dark:text-primary_text_d/50')}
            >
              <span>{getTimeAgo(post?.created_at)}</span>
              <span>•</span>
              <span>Danh mục</span>
            </span>
          </div>
        </div>
      )}
      {props.type === 'warehouse' ? (
        <div className="flex mb-1"></div>
      ) : (
        <div className="absolute top-0 right-0">
          <ThreeDot isUrgently={props.type === 'urgently'} threeDotEvents={props.threeDotEvents} />
        </div>
      )}
    </div>
  );
};
