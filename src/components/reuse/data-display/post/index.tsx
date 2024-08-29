'use client';

import CopyButton from '@/components/common/copy-button';
import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import { BlueEyeIcon, HeartRedIcon, PhoneIcon } from '@/components/icons';
import { ClockIcon } from '@/components/icons/clock.icon';
import { HistoryIcon } from '@/components/icons/history.icon';
import { Routes } from '@/constants/enums';
import { isTextClamped } from '@/utilities/func.text';
import { getTimeAgo } from '@/utilities/func.time';
import { Rate, Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Comment, CommentTypes, ModalCommentList } from '../comment';
import { ImageGrid } from '../images';
import LikeShareComment from './like-share-comment';
import { Marquee } from './marquee';
import { Booking, NewReport, Note, SuitableCustomer } from './popup-group';
import { ThreeDot, ThreeDotEventProps } from './three-dot';

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
  comments?: CommentTypes[];
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
  const [comments, setComments] = useState<CommentTypes[]>();
  const [postWidth, setPostWidth] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    setLikeCount(post?.like_count || 0);
    setComments(post?.comments);
  }, [post]);
  useEffect(() => {
    const handleResize = () => {
      setPostWidth(rootRef.current?.clientWidth || 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [post, rootRef]);
  const imageCount = post?.images?.length || 0;

  return (
    <>
      <div
        ref={rootRef}
        className={clsx(
          'bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-4 sm:py-6',
          isWarehouse ? '!pt-0' : '',
          !comments || comments?.length === 0 ? '!pb-0' : '',
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
                  className="font-semibold text-primary_text_l dark:text-primary_text_d sm:text-base"
                  href={Routes.User + '/' + 'id'}
                >
                  Nhà Phố Việt Nam
                </Link>
                <div className="[&_span]:text-sm text-secondary_text_l dark:text-primary_text_d flex gap-[10px]">
                  <span className={clsx('gap-[10px]', isWarehouse ? 'hidden' : 'flex')}>
                    <span>{getTimeAgo(post?.created_at)}</span>
                    <span>•</span>
                    <span>Phòng nhóm</span>
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
                'justify-between items-center mb-4 gap-1',
                isWarehouse ? 'flex' : 'hidden',
              )}
            >
              <div className="flex gap-[2px] sm:gap-1 md:gap-2 text-base">
                <span className="font-semibold text-color_l text-nowrap">27.727 tỷ</span>
                <span>·</span>
                <span className="text-nowrap">255.152tr/m</span>
              </div>
              <Tag className="!text-[14px] lg:!text-sm font-semibold bg-background_l dark:bg-background_d border-none overflow-hidden">
                <Marquee
                  className={clsx(postWidth > 580 ? 'w-[280px]' : 'w-[200px]')}
                  text={'Nhà mặt phố, 3 tầng có ban công, sân thượng '}
                />
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
            <ImageGrid images={post?.images || []} isWarehouse={isWarehouse} />
          </div>
        </div>
        <div className="w-full px-3 sm:px-4">
          <div className={clsx((post?.images || []).length > 0 ? 'mt-1' : 'mt-2')}>
            <div className="flex justify-between">
              <div className="flex gap-3">
                {post?.view_count && post?.view_count > 0 && (
                  <div className="flex gap-1 items-center dark:text-primary_text_d">
                    <BlueEyeIcon />
                    <span className="text-sm">{post?.view_count}</span>
                  </div>
                )}
                {likeCount > 0 && (
                  <div className="flex gap-1 items-center dark:text-primary_text_d">
                    <HeartRedIcon />
                    <span className="text-sm">{likeCount}</span>
                  </div>
                )}
              </div>
              <div className={clsx('flex gap-0', isWarehouse ? 'hidden' : 'flex')}>
                <a
                  href="https://www.facebook.com/messages/t/100010636721382"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <MessengerKNPImage className="w-4 h-4" />
                  <span
                    className={clsx('inline-block text-nowrap', postWidth < 480 ? 'hidden' : '')}
                  >
                    Chat
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/messages/t/100010636721382"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <MessengerImage className="w-4 h-4" />
                  <span
                    className={clsx('inline-block text-nowrap', postWidth < 480 ? 'hidden' : '')}
                  >
                    Messenger
                  </span>
                </a>
                <a
                  href="https://zalo.me/0389619050"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <ZaloImage className="w-4 h-4" />
                  <span
                    className={clsx('inline-block text-nowrap', postWidth < 480 ? 'hidden' : '')}
                  >
                    Zalo
                  </span>
                </a>

                <a
                  href="tel:0389619050"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <div className="w-4 h-4">
                    <PhoneImage />
                  </div>
                  <span
                    className={clsx('inline-block text-nowrap', postWidth < 480 ? 'hidden' : '')}
                  >
                    Điện thoại
                  </span>
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
            {!comments ||
              (comments?.length === 0 && (
                <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
              ))}
          </div>
          {comments && comments.length > 0 && (
            <div className="mt-4">
              <div className="w-full flex flex-col gap-2">
                {comments?.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={{}}
                    onClick={() => {
                      setIsOpenModalComment(true);
                    }}
                    onReplyClick={() => {
                      setIsOpenModalComment(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {comments && comments.length > 0 && (
            <div className="mt-4 max-[640px]:hidden">
              <div className="flex justify-between items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image width={40} height={40} src="/images/user-default.jpg" alt="" />
                </div>
                <div className="relative flex-1 bg-black/5 dark:bg-[#151E2F] rounded-2xl py-[2px] px-3">
                  <div
                    className="w-full h-9 bg-transparent focus:outline-none border-none outline-none flex items-center"
                    onClick={() => {
                      setIsOpenModalComment(true);
                    }}
                  >
                    <span className="select-none opacity-60">Viết bình luận ...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpenModalComment && <ModalCommentList open onClose={() => setIsOpenModalComment(false)} />}
    </>
  );
};

export default PostDetail;
