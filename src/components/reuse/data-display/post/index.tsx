'use client';
import { CopyIcon, HeartRedIcon, PeopleGroup, PhoneIcon } from '@/components/icons';
import { CopyDocumentIcon } from '@/components/icons/';
import { AlarmIcon } from '@/components/icons/alarm.icon';
import { BookmarkIcon } from '@/components/icons/bookmark.icon';
import { ClockIcon } from '@/components/icons/clock.icon';
import { CommentIcon } from '@/components/icons/comment.icon';
import { HistoryIcon } from '@/components/icons/history.icon';
import { NoteIcon } from '@/components/icons/note.icon';
import { Tag } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import CommentInput from '../../data-entry/comment-input';
import Comment from '../comment';
import ImageGrid from '../image-grid';
import LikeComponent from '../like';
import FormReportPopup from '../popup/form-report';
import ListOfReportsPopup from '../popup/list-of-reports';
import NotePopup from '../popup/note';
import SuitableCustomerPopup from '../popup/suitable-customer';
import Rating from '../rating';
import ShareComponent from '../share';
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
  images?: string[];
  tags?: string[];
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

const isTextClamped = (elm: HTMLDivElement) => elm?.scrollHeight > elm?.clientHeight;

const PostDetail = ({ post, isWarehouse, isUrgently, threeDotEvents }: IPostDetailProps) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(isUrgently || false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isShowReportPopup, setIsShowReportPopup] = useState<boolean>(false);
  const [isShowModalSuitableCustomerPopup, setIsShowModalSuitableCustomerPopup] =
    useState<boolean>(false);
  const [isShowNotePopup, setIsShowNotePopup] = useState<boolean>(false);
  const [isShowReport, setIsShowReport] = useState<boolean>(false);
  const [isShowBooking, setIsShowBooking] = useState<boolean>(false);
  const [_clipboard, onCopyClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // Copied
  const imageCount = post?.images?.length || 0;
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsHidden(isTextClamped(contentRef.current as HTMLDivElement));
    const handleResize = () => {
      setIsHidden(isTextClamped(contentRef.current as HTMLDivElement));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageCount, post?.content]);

  return (
    <div
      className={clsx(
        'bg-white dark:bg-primary_color_d p-6 rounded-lg w-full',
        isWarehouse ? 'pt-0' : '',
      )}
    >
      <div className={clsx('h-[40px] w-full', isWarehouse ? 'mb-4' : 'hidden')}>
        <div className="h-full w-full flex justify-between items-center">
          <span className="flex items-center gap-2">
            <ClockIcon />
            <span className="inline-block leading-4 text-[12px] ">17/01/2024 11:49:53</span>
          </span>
          <button className="border-none bg-transparent cursor-pointer flex items-center gap-2">
            <HistoryIcon />
            <span className="inline-block leading-4  text-[12px]">Lịch sử chỉnh sửa</span>
          </button>
        </div>
        <div className="w-[calc(100%_+_64px)] -mx-8 h-[1px] bg-background_l dark:bg-background_d"></div>
      </div>
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
            <Link className="font-semibold text-primary_text_l dark:text-primary_text_d" href={'/'}>
              Nhà Phố Việt Nam
            </Link>
            <div className="[&_span]:text-sm text-secondary_text_l dark:text-primary_text_d flex gap-[10px]">
              <span className={clsx('gap-[10px]', isWarehouse ? 'hidden' : 'flex')}>
                <span>10 phút trước</span>
                <span>•</span>
                <span>Quy định và hướng dẫn</span>
              </span>
              <div className={clsx('', isWarehouse ? 'flex gap-[10px]' : 'hidden')}>
                <div className="mt-[6px]">
                  <Rating value={4.5} />
                </div>
                <span className="font-semibold text-primary_text_l dark:text-primary_text_d">
                  4,5
                </span>
                <span className="text-primary_text_l dark:text-primary_text_d">•</span>
                <a href="https://www.facebook.com/messages/t/1" target="_blank">
                  <Image
                    width={20}
                    height={18}
                    src={'/images/messenger-knp.png'}
                    alt="/images/messenger-knp.png"
                  />
                </a>
                <a href="https://www.facebook.com/messages/t/1" target="_blank">
                  <Image
                    width={20}
                    height={20}
                    src={'/images/messenger.png'}
                    alt="/images/messenger.png"
                  />
                </a>
                <a href="https://zalo.me/0391398381" target="_blank" className="">
                  <Image width={15} height={15} src={'/images/zalo.png'} alt="/images/zalo.png" />
                </a>
                <a href="tel:0391398381">
                  <PhoneIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(isWarehouse ? 'flex' : 'hidden')}>
          <Tag className="!text-[12px] font-semibold bg-background_l dark:bg-background_d border-none">
            Bán mạnh
          </Tag>
        </div>
        <div className={clsx('absolute top-0 right-0', isWarehouse ? 'hidden' : '')}>
          <ThreeDot isUrgently={isUrgently} threeDotEvents={threeDotEvents} />
        </div>
      </div>
      <div className="mt-4">
        <div
          className={clsx(' justify-between items-center mb-4', isWarehouse ? 'flex' : 'hidden')}
        >
          <div className="flex gap-2 text-sm">
            <span className="font-semibold text-color_l ">27.727 tỷ</span>
            <span>·</span>
            <span>255.152tr/m</span>
          </div>
          <Tag className="!text-[12px] font-normal bg-background_l dark:bg-background_d border-none">
            Mặt phố, kinh doanh, có tầng thượn
          </Tag>
        </div>
        <div className="overflow-hidden">
          <div className={clsx('', isWarehouse ? 'flex' : 'hidden')}>
            16A.20 Lý Nam Đế 80 5 12.8 28 tỷ Hoàn Kiếm Hà Nội HĐ ĐC Ngô Xuân Hà NPHN-886, 056272444,
            X3, nguồn ĐT10, 25 đến 35
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
          <div className={!isWarehouse ? 'mt-2' : 'hidden'}>
            <button
              onClick={() => {
                onCopyClipboard(post?.content || '');
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 3000);
              }}
              disabled={isCopied}
              className={clsx(
                'py-[2px] px-1 text-base border-black/20 dark:border-primary_text_d_2 rounded bg-transparent cursor-pointer flex justify-between items-center gap-2 border',
              )}
            >
              <CopyIcon />
              <span className="text-sm">{isCopied ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>
        <div className={clsx('mt-3 flex-wrap gap-2', isWarehouse ? 'hidden' : 'flex')}>
          <span className="text-link_text_l cursor-pointer hover:underline lowercase">#NPVN</span>
          <span className="text-link_text_l cursor-pointer hover:underline lowercase">#NP781</span>
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
          <div
            className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d relative cursor-pointer"
            onClick={() => {
              setIsShowModalSuitableCustomerPopup(true);
            }}
          >
            <PeopleGroup />
            <span className="flex items-center justify-center absolute text-[8px] bg-red-500 text-white rounded-full w-3 h-3 top-0 right-0 select-none">
              10
            </span>
          </div>
          <div
            className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d relative cursor-pointer"
            onClick={() => {
              setIsShowReportPopup(true);
            }}
          >
            <CopyDocumentIcon />
            <span className="flex items-center justify-center absolute text-[8px] bg-red-500 text-white rounded-full w-3 h-3 top-0 right-0 select-none">
              10
            </span>
          </div>
        </div>
      </div>
      <div className={clsx('mt-2', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <div>
          <ImageGrid images={post?.images || []} />
        </div>
      </div>
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
              <span className="text-sm">133</span>
            </div>
          </div>
          <div
            className={clsx(
              'flex gap-2 sm:gap-5 [&_span]:hidden sm:[&_span]:inline-block',
              isWarehouse ? 'hidden' : 'flex',
            )}
          >
            <a
              href="tel:0391398381"
              target="_blank"
              className="flex gap-1 items-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
            >
              <PhoneIcon />
              <span>Điện thoại</span>
            </a>
            <a
              href="https://zalo.me/0391398381"
              target="_blank"
              className="flex gap-1 items-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
            >
              <Image width={16} height={16} src={'/images/zalo.png'} alt="/images/zalo.png" />
              <span>Zalo</span>
            </a>
            <a
              href="/m"
              target="_blank"
              className="flex gap-1 items-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
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
            <div
              className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
              onClick={() => {
                setIsShowBooking(true);
              }}
            >
              <AlarmIcon width={17} height={20} />
              <span className="ms-1">Đặt lịch</span>
            </div>
            <div className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none">
              <BookmarkIcon className="fill-[#FF4D4F] scale-90" />
              <span className="ms-1">Lưu</span>
            </div>
            <div
              className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
              onClick={() => setIsShowNotePopup(true)}
            >
              <NoteIcon className="fill-[#FFB547]" />
              <span className="ms-1">Ghi chú</span>
            </div>
            <div
              className="min-w-10 flex gap-1 items-center justify-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-primary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d cursor-pointer select-none"
              onClick={() => {
                setIsShowReport(true);
              }}
            >
              <CopyDocumentIcon />
              <span className="ms-1">Báo cáo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
        <div className="w-full flex justify-between items-center">
          <button className="border-transparent bg-transparent flex-1 px-0">
            <LikeComponent liked></LikeComponent>
          </button>
          <button className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d px-0">
            <span className="inline-block w-5 h-5">
              <CommentIcon></CommentIcon>
            </span>
            <span>Bình luận</span>
          </button>
          <button className="border-transparent bg-transparent flex-1 px-0">
            <ShareComponent content="/"></ShareComponent>
          </button>
        </div>
        <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
      </div>
      <div className="mt-4">
        <div className="w-full flex flex-col">
          <Comment comment={{}} />
          <Comment comment={{}} />
        </div>
      </div>
      <div className="mt-4">
        <CommentInput></CommentInput>
      </div>
      <ListOfReportsPopup
        open={isShowReportPopup}
        onCancel={() => {
          setIsShowReportPopup(false);
        }}
        onOk={() => {
          setIsShowReportPopup(false);
        }}
        setOpen={() => {
          setIsShowReportPopup(false);
        }}
      />
      <SuitableCustomerPopup
        open={isShowModalSuitableCustomerPopup}
        onCancel={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
        onOk={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
        setOpen={() => {
          setIsShowModalSuitableCustomerPopup(false);
        }}
      />
      <NotePopup
        open={isShowNotePopup}
        onCancel={() => setIsShowNotePopup(false)}
        onOk={() => {
          setIsShowNotePopup(false);
        }}
        setOpen={() => {
          setIsShowNotePopup(false);
        }}
      />
      <FormReportPopup open={isShowReport} setOpen={setIsShowReport} />
      <ModalBooking
        open={isShowBooking}
        handleCancel={() => {
          setIsShowBooking(false);
        }}
      />
    </div>
  );
};

export default PostDetail;
