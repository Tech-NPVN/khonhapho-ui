'use client';

import CopyButton from '@/components/common/copy-button';
import { MessengerImage, MessengerKNPImage } from '@/components/common/image-components';
import { HeartRedIcon, PhoneIcon } from '@/components/icons';
import { ClockIcon } from '@/components/icons/clock.icon';
import { HistoryIcon } from '@/components/icons/history.icon';
import { Rate, Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CommentInput from '../../data-entry/comment-input';
import { Comment, ModalCommentList } from '../comment';
import { ImageGrid } from '../images';
import LikeShareComment from './like-share-comment';
import { Booking, NewReport, Note, SuitableCustomer } from './popup-group';
import ThreeDot, { ThreeDotEventProps } from './three-dot';

export interface IPostDetail {
  id?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    phone?: string;
    message?: string;
  };
  content?: string;
  videos?: string[];
  images?: string[];
  tags?: string[];
  view_count?: number;
  like_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IPostDetailProps {
  post?: IPostDetail;
  classNames?: {
    root?: string;
  };
  isWarehouse?: boolean;
  isUrgently?: boolean;
  className?: string;
  threeDot?: boolean;
  threeDotEvents?: ThreeDotEventProps;
}

export const isTextClamped = (elm: HTMLDivElement) => elm?.scrollHeight > elm?.clientHeight;

const PostDetail = ({
  post,
  isWarehouse,
  isUrgently,
  threeDotEvents,
  className,
}: IPostDetailProps) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(isUrgently || false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post?.like_count || 0);
  const imageCount = post?.images?.length || 0;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (isShowMore) return;
      setIsHidden(isTextClamped(contentRef.current as HTMLDivElement));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isShowMore, post?.content]);

  return (
    <>
      <div
        className={clsx(
          'bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-4 sm:py-6',
          isWarehouse ? '!pt-0' : '',
          className,
        )}
      >
        <div className={clsx('h-[40px] w-full', isWarehouse ? 'mb-4' : 'hidden')}>
          <div className="h-full w-full flex justify-between items-center px-3 sm:px-4">
            <span className="flex items-center gap-2">
              <ClockIcon />
              <span className="inline-block leading-4 text-[12px] ">17/01/2024 11:49:53</span>
            </span>
            <button className="border-none bg-transparent cursor-pointer flex items-center gap-2">
              <HistoryIcon />
              <span className="inline-block leading-4 text-[12px]">Lịch sử chỉnh sửa</span>
            </button>
          </div>
          <div className="w-full h-[1px] bg-background_l dark:bg-background_d"></div>
        </div>
        <div className="w-full px-3 sm:px-4">
          <div className="flex justify-between items-end relative">
            <div className="flex">
              <div>
                <Image
                  className="w-10 h-10 rounded-full mr-3"
                  width={40}
                  height={40}
                  src="/images/user-default.jpg"
                  alt="User"
                />
              </div>
              <div>
                <Link
                  className="font-semibold text-primary_text_l dark:text-primary_text_d"
                  href={'/'}
                >
                  Nhà Phố Việt Nam
                </Link>
                <div className="[&_span]:text-sm text-secondary_text_l dark:text-primary_text_d flex gap-[10px]">
                  <span className={clsx('gap-[10px]', isWarehouse ? 'hidden' : 'flex')}>
                    <span>10 phút trước</span>
                    <span>•</span>
                    <span>Quy định và hướng dẫn</span>
                  </span>
                  <div className={clsx('', isWarehouse ? 'flex gap-[10px]' : 'hidden')}>
                    <div className="-mt-1 sm:-mt-[2px]">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={4.5}
                        className="[&_svg]:w-2 [&_svg]:h-2 sm:[&_svg]:w-3 sm:[&_svg]:h-3 [&_.ant-rate-star-first_svg]:fill-[#fbbc04] [&_.ant-rate-star-full_svg]:fill-[#fbbc04] [&>li]:me-1"
                      />
                    </div>
                    <span className="text-[8px] font-semibold text-primary_text_l dark:text-primary_text_d">
                      4,5
                    </span>
                    <span className="text-primary_text_l dark:text-primary_text_d">•</span>
                    <Link href="/Messenger/id">
                      <div className="w-4">
                        <MessengerKNPImage />
                      </div>
                    </Link>
                    <a href="https://www.facebook.com/messages/t/100010636721382" target="_blank">
                      <div className="w-4">
                        <MessengerImage />
                      </div>
                    </a>
                    <a href="https://zalo.me/0389619050" target="_blank" className="">
                      <Image
                        width={15}
                        height={15}
                        src={'/images/zalo.png'}
                        alt="/images/zalo.png"
                      />
                    </a>
                    <a href="tel:0389619050">
                      <PhoneIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(isWarehouse ? 'flex mb-1' : 'hidden')}>
              <Tag className="!text-[14px] font-semibold bg-background_l dark:bg-background_d border-none">
                Bán mạnh
              </Tag>
            </div>
            <div className={clsx('absolute top-0 right-0', isWarehouse ? 'hidden' : '')}>
              <ThreeDot isUrgently={isUrgently} threeDotEvents={threeDotEvents} />
            </div>
          </div>
          <div className="mt-4">
            <div
              className={clsx(
                'justify-between items-center mb-4 flex-wrap',
                isWarehouse ? 'flex' : 'hidden',
              )}
            >
              <div className="flex gap-2 text-base">
                <span className="font-semibold text-color_l ">27.727 tỷ</span>
                <span>·</span>
                <span>255.152tr/m</span>
              </div>
              <Tag className="!text-[14px] lg:!text-sm font-semibold bg-background_l dark:bg-background_d border-none">
                Mặt phố, kinh doanh, có tầng thượng
              </Tag>
            </div>
            <div className="overflow-hidden">
              <div className={clsx('text-base', isWarehouse ? 'flex' : 'hidden')}>
                16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886,
                056272444, X3, nguồn ĐT10, 25 đến 35
              </div>
              <div className={clsx('gap-1 mt-2', isWarehouse ? 'flex' : 'hidden')}>
                <div>Mô tả:</div>
                <div className={clsx('flex-wrap gap-2 flex')}>
                  <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                    #NPVN
                  </span>
                  <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                    #NP781
                  </span>
                  <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                    #NP92193
                  </span>
                </div>
              </div>
              <div className="flex w-full items-end flex-wrap">
                <div
                  ref={contentRef}
                  className={clsx(
                    'text-base dark:text-primary_text_d',
                    isWarehouse ? 'mt-4' : '',
                    isShowMore
                      ? 'w-full'
                      : imageCount === 0 && !isWarehouse
                      ? 'overflow-hidden line-clamp-[9]'
                      : imageCount === 0 && isWarehouse
                      ? 'overflow-hidden line-clamp-[3]'
                      : imageCount > 0 && isWarehouse
                      ? 'overflow-hidden line-clamp-[1]'
                      : 'overflow-hidden line-clamp-[7]',
                  )}
                >
                  <div dangerouslySetInnerHTML={{ __html: post?.content || '' }}></div>
                </div>
                <button
                  onClick={() => {
                    setIsShowMore((prev) => !prev);
                  }}
                  className={clsx(
                    isHidden ? 'block' : 'hidden',
                    'py-[2px] px-0 text-base rounded-lg font-medium text-link_text_l hover:underline bg-transparent border-0 cursor-pointer',
                  )}
                >
                  {isShowMore ? 'Thu gọn' : 'Xem thêm'}
                </button>
              </div>
              <div className={'mt-2'}>
                <CopyButton content={post?.content || ''} />
              </div>
            </div>
            <div className={clsx('mt-3 flex-wrap gap-2', isWarehouse ? 'hidden' : 'flex')}>
              <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                #NPVN
              </span>
              <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                #NP781
              </span>
              <span className="text-link_text_l cursor-pointer hover:underline lowercase">
                #NP92193
              </span>
            </div>
          </div>
          <div className={clsx('mt-4 flex justify-between', isWarehouse ? '' : 'hidden')}>
            <div className="flex gap-2 items-center">
              <Tag color="red">Có sổ đỏ - Thiếu Seri Sổ</Tag>
              <div>
                Mã số: <span className="text-link_text_l hover:underline">#18182</span>
              </div>
            </div>
            <div className="flex gap-1">
              <SuitableCustomer />
            </div>
          </div>
        </div>
        <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
          <div>
            <ImageGrid images={post?.images || []} />
          </div>
        </div>
        <div className="w-full px-3 sm:px-4">
          <div className={clsx((post?.images || []).length > 0 ? 'mt-1' : 'mt-2')}>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="flex gap-1 items-center dark:text-primary_text_d">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    className="fill-link_text_l"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.1871 8C6.1871 8.46413 6.37148 8.90925 6.69967 9.23744C7.02785 9.56563 7.47297 9.75 7.9371 9.75C8.40123 9.75 8.84635 9.56563 9.17454 9.23744C9.50273 8.90925 9.6871 8.46413 9.6871 8C9.6871 7.53587 9.50273 7.09075 9.17454 6.76256C8.84635 6.43437 8.40123 6.25 7.9371 6.25C7.47297 6.25 7.02785 6.43437 6.69967 6.76256C6.37148 7.09075 6.1871 7.53587 6.1871 8ZM14.7215 7.59688C13.2402 4.47656 11.0012 2.90625 7.9996 2.90625C4.99648 2.90625 2.75898 4.47656 1.27773 7.59844C1.21831 7.72425 1.1875 7.86165 1.1875 8.00078C1.1875 8.13991 1.21831 8.27732 1.27773 8.40312C2.75898 11.5234 4.99804 13.0938 7.9996 13.0938C11.0027 13.0938 13.2402 11.5234 14.7215 8.40156C14.8418 8.14844 14.8418 7.85469 14.7215 7.59688ZM7.9371 10.75C6.41835 10.75 5.1871 9.51875 5.1871 8C5.1871 6.48125 6.41835 5.25 7.9371 5.25C9.45585 5.25 10.6871 6.48125 10.6871 8C10.6871 9.51875 9.45585 10.75 7.9371 10.75Z" />
                  </svg>
                  <span className="text-sm">3131</span>
                </div>
                <div className="flex gap-1 items-center dark:text-primary_text_d">
                  <HeartRedIcon />
                  <span className="text-sm">{likeCount}</span>
                </div>
              </div>
              <div
                className={clsx(
                  'flex gap-0 [&_span]:hidden sm:[&_span]:inline-block',
                  isWarehouse ? 'hidden' : 'flex',
                )}
              >
                <a
                  href="tel:0389619050"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-1 sm:px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <PhoneIcon />
                  <span>Điện thoại</span>
                </a>
                <a
                  href="https://zalo.me/0389619050"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-1 sm:px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <Image width={16} height={16} src={'/images/zalo.png'} alt="/images/zalo.png" />
                  <span>Zalo</span>
                </a>
                <a
                  href="https://www.facebook.com/messages/t/100010636721382"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-1 sm:px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <Image
                    width={19}
                    height={19}
                    src={'/images/messenger.png'}
                    alt="/images/messenger.png"
                  />
                  <span>Messenger</span>
                </a>
              </div>
              <div
                className={clsx(
                  'flex [&_span]:hidden sm:[&_span]:inline-block',
                  isWarehouse ? '' : 'hidden',
                )}
              >
                <Booking />
                <Note />
                <NewReport />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
            <LikeShareComment setLikeCount={setLikeCount} liked={isLiked} setLiked={setIsLiked} />
            <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
          </div>
          <div className="mt-4">
            <div className="w-full flex flex-col gap-2">
              <Comment
                comment={{}}
                onClick={() => {
                  setIsOpenModalComment(true);
                }}
                onReply={() => {
                  setIsOpenModalComment(true);
                }}
              />
            </div>
          </div>
          <div className="mt-4 max-[640px]:hidden">
            <CommentInput></CommentInput>
          </div>
        </div>
      </div>
      {isOpenModalComment && <ModalCommentList open onClose={() => setIsOpenModalComment(false)} />}
    </>
  );
};

export default PostDetail;
