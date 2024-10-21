'use client';

import { ModalEditHistory } from '@/common/modal';
import { MarqueeText, TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import {
  BlueEyeIcon,
  ClockIcon,
  HeartRedIcon,
  HistoryIcon,
  UserConfirmStatusIcon,
} from '@/components/icons';
import { TriangleWarningIcon } from '@/components/icons/warning.icon';
import { Routes } from '@/constants/enums';
import { convertReportingTime, getTimeAgo } from '@/utilities/func.time';
import { Rate, Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Comment, CommentTypes, ModalCommentList } from '../comment';
import { ImageGrid } from '../images';
import LikeShareComment from './like-share-comment';
import { SuitableCustomer } from './popup-group';
import { ThreeDot, ThreeDotEventProps } from './three-dot';

interface FeedTypes {
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

type FeedProps = {
  post?: FeedTypes;
  classNames?: {
    root?: string;
  };
  type?: 'warehouse' | 'urgently' | 'default';
  className?: string;
  threeDotEvents?: ThreeDotEventProps;
  onHashtagClick?: (hashtag?: string) => void;
};

const FeedDetail = ({
  post,
  threeDotEvents,
  className,
  type = 'default',
  onHashtagClick,
}: FeedProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post?.like_count || 0);
  const [comments, setComments] = useState<CommentTypes[]>();
  const [postWidth, setPostWidth] = useState<number>(
    window.innerWidth < 480 ? window.innerWidth : 480,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLikeCount(post?.like_count || 0);
    setComments(post?.comments);
  }, [post]);
  useEffect(() => {
    const element = rootRef.current;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        setPostWidth(entries[0].contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [post, rootRef]);
  const imageCount = post?.images?.length || 0;
  const commentCount = post?.comments?.length || 0;

  return (
    <>
      <div
        ref={rootRef}
        className={clsx(
          'bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-4 max-w-[864px]',
          type === 'warehouse' ? '!pt-0' : '',
          !comments || comments?.length === 0 ? '!pb-0' : '',
          className,
        )}
      >
        {type === 'default' && (
          <Default
            post={post}
            onHashtagClick={onHashtagClick}
            width={postWidth}
            threeDotEvents={threeDotEvents}
          />
        )}
        {type === 'warehouse' && (
          <Warehouse
            post={post}
            onHashtagClick={onHashtagClick}
            width={postWidth}
            threeDotEvents={threeDotEvents}
          />
        )}
        {type === 'urgently' && (
          <Urgently
            post={post}
            onHashtagClick={onHashtagClick}
            width={postWidth}
            threeDotEvents={threeDotEvents}
          />
        )}
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
              <div className="flex gap-0">
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
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
            <LikeShareComment setLikeCount={setLikeCount} liked={isLiked} setLiked={setIsLiked} />
            {commentCount > 0 && (
              <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
            )}
          </div>
          {commentCount > 0 && (
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
                      return true;
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {commentCount > 0 && (
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

//? Các Feed lớn
const Warehouse: React.FC<
  FeedProps & {
    width?: number;
  }
> = ({ post, width = 480 }) => {
  return (
    <>
      <div className="h-[40px] w-full mb-4">
        <div className="h-full w-full flex justify-between items-center px-3 sm:px-4">
          <HistoryUpdate post={post} />
        </div>
        <div className="w-full h-[1px] bg-background_l dark:bg-background_d"></div>
      </div>
      <div className="w-full px-3 sm:px-4">
        <div className="flex justify-between items-end relative">
          <AvatarGroup type="warehouse" width={width} />
        </div>
        <div className="mt-2">
          <Information post={post} />
        </div>
        <div className="mt-2">
          <FeedContent post={post} maxLineDisplay={3} />
        </div>
        <div className="mt-2 flex justify-between flex-wrap gap-2 w-full">
          <div className={'flex gap-2 items-center justify-between w-full'}>
            <Tag color="red">Có sổ đỏ - Thiếu Seri Sổ</Tag>
            <div>
              Mã số: <span className="text-link_text_l hover:underline">#18182</span>
            </div>
          </div>
          <div className={'flex gap-1 justify-between w-full'}>
            <button className="px-2 py-1 border-none bg-color_l dark:bg-color_l text-white rounded-md flex gap-2 cursor-pointer items-center">
              <UserConfirmStatusIcon
                width={14}
                height={18}
                className="!fill-white dark:!fill-white"
              />
              Xác nhận còn bán
            </button>
            <SuitableCustomer label="Khách phù hợp" />
          </div>
        </div>
        <div className="mt-2 p-1 gap-1 text-center border border-solid rounded-lg border-error_l dark:border-r-error_d flex items-center justify-center text-error_l dark:text-error_d text-base">
          <span>
            <TriangleWarningIcon
              width={18}
              height={16}
              className="fill-error_l dark:fill-error_d"
            />{' '}
            Cảnh báo: Đã 100 ngày chưa có tương tác. Đầu chủ chưa xác thực tình trạng còn bán.
          </span>
        </div>
      </div>

      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <div>
          <ImageGrid images={post?.images || []} canDownload isWarehouse={width >= 480} />
        </div>
      </div>
    </>
  );
};

const Urgently: React.FC<
  FeedProps & {
    width?: number;
  }
> = ({ post, onHashtagClick, threeDotEvents, width = 480 }) => {
  return (
    <>
      <div className="w-full px-3 sm:px-4">
        <div className="w-full flex justify-between items-end relative">
          <AvatarGroup width={width} threeDotEvents={threeDotEvents} />
        </div>
        <div>
          <FeedContent post={post} maxLineDisplay={-1} />
        </div>
        <div>
          <Hashtag items={post?.tags} onHashtagClick={onHashtagClick} />
        </div>
      </div>
      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <div>
          <ImageGrid images={post?.images || []} canDownload />
        </div>
      </div>
    </>
  );
};

const Default: React.FC<
  FeedProps & {
    width?: number;
  }
> = ({ post, onHashtagClick, threeDotEvents, width = 480 }) => {
  return (
    <>
      <div className="w-full px-3 sm:px-4">
        <div className="w-full flex justify-between items-end relative">
          <AvatarGroup width={width} threeDotEvents={threeDotEvents} />
        </div>
        <div>
          <FeedContent post={post} maxLineDisplay={7} />
        </div>
        <div>
          <Hashtag items={post?.tags} onHashtagClick={onHashtagClick} />
        </div>
      </div>
      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <div>
          <ImageGrid images={post?.images || []} canDownload isWarehouse={width >= 720} />
        </div>
      </div>
    </>
  );
};

//? Các component nhỏ
//[All] Avatar
const AvatarGroup: React.FC<
  FeedProps & {
    width?: number;
  }
> = ({ post, width = 480, ...props }) => {
  return (
    <div className={`w-full flex justify-between items-end relative ${props?.className}`}>
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
//[All] Nội dung bài viết
interface FeedContentProps {
  className?: string;
  post?: FeedTypes;
  maxLineDisplay?: number;
}
const FeedContent: React.FC<FeedContentProps> = ({ maxLineDisplay, post, className }) => {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <div className="flex w-full items-end flex-wrap">
        <TextSeeMore
          className="text-base dark:text-primary_text_d"
          _html={post?.content}
          maxLine={maxLineDisplay ?? 9}
        />
      </div>
      <div className={'mt-2'}>
        <CopyButton content={post?.content || ''} />
      </div>
    </div>
  );
};

//[Warehouse] Lịch sử cập nhật
const HistoryUpdate: React.FC<FeedProps> = (props) => {
  const [isOpenModalEditHistory, setIsOpenModalEditHistory] = useState<boolean>(false);
  return (
    <>
      <div className={`h-full w-full flex justify-between items-center px-0 ${props?.className}}`}>
        <span className="flex items-center gap-1 sm:gap-2">
          <ClockIcon />
          <span className="inline-block leading-4 text-[12px]">
            {convertReportingTime(props?.post?.updated_at)}
          </span>
        </span>
        <div
          className="border-none bg-transparent cursor-pointer flex items-center gap-1 sm:gap-2"
          onClick={() => {
            setIsOpenModalEditHistory(true);
          }}
        >
          <HistoryIcon />
          <span className="inline-block leading-4 text-[12px]">Lịch sử chỉnh sửa</span>
        </div>
      </div>
      <ModalEditHistory
        open={isOpenModalEditHistory}
        onClose={() => setIsOpenModalEditHistory(false)}
      />
    </>
  );
};
//[Warehouse] Diện tích giá đơn vị + Đặc điểm
const Information: React.FC<
  FeedProps & {
    width?: number;
  }
> = ({ post, width = 480, ...props }) => {
  return (
    <>
      <div className="justify-between items-center gap-2 flex">
        <div
          className={clsx(
            'flex gap-[2px] sm:gap-1 md:gap-2 text-base',
            width < 480 ? 'text-sm' : 'text-base',
          )}
        >
          <span className="font-semibold text-color_l text-nowrap">27.727 tỷ</span>
          <span>·</span>
          <span className="text-nowrap">255.152tr/m</span>
        </div>
        <Tag className="!text-[14px] lg:!text-sm font-semibold bg-background_l dark:bg-background_d border-none overflow-hidden">
          <MarqueeText
            className="max-w-[280px]"
            text={'Nhà mặt phố, 3 tầng có ban công, sân thượng, ngõ ô tô có thể kinh doanh'}
          />
        </Tag>
      </div>
      <div className="overflow-hidden mt-2">
        <div className="text-base flex">
          16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886, 056272444,
          X3, nguồn ĐT10, 25 đến 35
        </div>
        <div className="gap-1 mt-2 flex">
          <div>Mô tả:</div>
          <Hashtag className="!mt-0" items={post?.tags} onHashtagClick={props.onHashtagClick} />
        </div>
      </div>
    </>
  );
};

//[Default] Hashtag
interface HashtagProps {
  items?: string[];
  className?: string;
  onHashtagClick?: (hashtag: string) => void;
}
const Hashtag: React.FC<HashtagProps> = ({ className, items, onHashtagClick }) => {
  return (
    <div className={`mt-3 flex-wrap gap-2 flex ${className}`}>
      {items?.map((item) => (
        <span
          key={item}
          className="text-link_text_l cursor-pointer hover:underline lowercase"
          onClick={() => {
            onHashtagClick?.(item);
          }}
        >
          #{item}
        </span>
      ))}
    </div>
  );
};

export { FeedDetail };
