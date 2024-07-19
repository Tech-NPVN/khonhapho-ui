'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CommentInput from '../../data-entry/comment-input';
import Comment from '../comment';
import ImageGrid from '../image-grid';

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
  className?: string;
}

const isTextClamped = (elm: HTMLDivElement) => elm?.scrollHeight > elm?.clientHeight;

const PostDetail = ({ post }: IPostDetailProps) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const imageCount = post?.images?.length || 0;
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsHidden(isTextClamped(contentRef.current as HTMLDivElement));
  }, [imageCount, post?.content]);
  return (
    <div className="bg-white dark:bg-primary_color_d p-8 rounded-lg w-full">
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
          <div className="font-semibold text-primary_text_l dark:text-primary_text_d">
            Nhà Phố Việt Nam
          </div>
          <div className="[&_span]:text-sm text-secondary_text_l dark:text-primary_text_d flex gap-[10px]">
            <span>10 phút trước</span>
            <span>•</span>
            <span>Quy định và hướng dẫn</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="overflow-hidden">
          <div
            ref={contentRef}
            className={clsx(
              'text-base dark:text-primary_text_d',
              isShowMore
                ? ''
                : imageCount === 0
                ? 'overflow-hidden line-clamp-[9] '
                : 'overflow-hidden line-clamp-[7]',
            )}
          >
            <div dangerouslySetInnerHTML={{ __html: post?.content || '' }}></div>
          </div>
        </div>
        <div className="mt-1 flex">
          <button className="border cursor-pointer border-black/50 bg-transparent px-2 text-[12px] rounded-lg font-normal hidden">
            Sao chép
          </button>
          <button
            onClick={() => {
              setIsShowMore((prev) => !prev);
            }}
            className={clsx(
              isHidden ? 'block' : 'hidden',
              'py-[2px] px-2 text-base rounded-lg font-medium text-link_text_l hover:underline bg-transparent border-0',
            )}
          >
            {isShowMore ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-link_text_l cursor-pointer hover:underline lowercase">#NPVN</span>
          <span className="text-link_text_l cursor-pointer hover:underline lowercase">#NP781</span>
          <span className="text-link_text_l cursor-pointer hover:underline lowercase">
            #NP92193
          </span>
        </div>
      </div>
      <div className={clsx('mt-4', (post?.images || []).length > 0 ? '' : 'hidden')}>
        <div>
          <ImageGrid images={post?.images || []} />
        </div>
      </div>
      <div className={clsx((post?.images || []).length > 0 ? 'mt-4' : 'mt-2')}>
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
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={8} cy={8} r={8} fill="url(#paint0_linear_989_55371)" />
                <path
                  d="M11.1073 5.007C11.4271 5.29479 11.6669 5.63055 11.7948 6.03026C11.9227 6.44595 11.9387 6.84566 11.8428 7.26136C11.7469 7.67706 11.555 8.0288 11.2672 8.31659L8.18146 11.5143C8.06954 11.6262 7.94163 11.6742 7.81373 11.6742C7.66983 11.6742 7.54192 11.6262 7.44599 11.5143L4.36024 8.33258C4.05646 8.0288 3.8646 7.67706 3.76867 7.26136C3.67274 6.84566 3.70472 6.44595 3.83262 6.03026C3.96053 5.63055 4.18437 5.29479 4.52012 5.007C4.80791 4.76717 5.12768 4.60729 5.49541 4.54334C5.84716 4.47938 6.21489 4.51136 6.56663 4.62328C6.91838 4.75119 7.22216 4.94305 7.49396 5.21485L7.81373 5.53462L8.13349 5.21485C8.38931 4.94305 8.70908 4.75119 9.06082 4.62328C9.41256 4.51136 9.76431 4.47938 10.132 4.54334C10.4838 4.60729 10.8195 4.76717 11.1073 5.007Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_989_55371"
                    x1={8}
                    y1={0}
                    x2={8}
                    y2={16}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F95E73" />
                    <stop offset={1} stopColor="#E3223C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm">133</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-5 [&_span]:hidden sm:[&_span]:inline-block">
            <a
              href="tel:0391398381"
              target="_blank"
              className="flex gap-1 items-center hover:bg-background_l_2 rounded-md p-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 16 16"
                className="fill-color_l"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.8375 3.59687L12.1734 1.93438C12.0561 1.81647 11.9165 1.72293 11.7629 1.65911C11.6092 1.59529 11.4445 1.56246 11.2781 1.5625C10.9391 1.5625 10.6203 1.69531 10.3813 1.93438L8.59063 3.725C8.47272 3.84238 8.37918 3.98191 8.31536 4.13555C8.25154 4.2892 8.21871 4.45394 8.21875 4.62031C8.21875 4.95938 8.35156 5.27813 8.59063 5.51719L9.9 6.82656C9.59351 7.50213 9.16738 8.1167 8.64219 8.64062C8.11831 9.16709 7.50379 9.59477 6.82813 9.90312L5.51875 8.59375C5.40137 8.47585 5.26184 8.3823 5.1082 8.31849C4.95455 8.25467 4.78981 8.22184 4.62344 8.22188C4.28438 8.22188 3.96563 8.35469 3.72656 8.59375L1.93438 10.3828C1.81633 10.5004 1.7227 10.6402 1.65888 10.7941C1.59506 10.948 1.56231 11.1131 1.5625 11.2797C1.5625 11.6188 1.69531 11.9375 1.93438 12.1766L3.59531 13.8375C3.97656 14.2203 4.50313 14.4375 5.04375 14.4375C5.15781 14.4375 5.26719 14.4281 5.375 14.4094C7.48125 14.0625 9.57031 12.9422 11.2563 11.2578C12.9406 9.575 14.0594 7.4875 14.4109 5.375C14.5172 4.72969 14.3031 4.06562 13.8375 3.59687Z" />
              </svg>
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
        </div>
      </div>

      <div className="mt-2">
        <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
        <div className="w-full flex justify-between items-center ">
          <button className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d">
            <span className="inline-block w-4 h-4">
              <svg
                className="w-full h-full fill-divider_d"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 471.701 471.701"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
		c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
		l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
		C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
		s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
		c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
		C444.801,187.101,434.001,213.101,414.401,232.701z"
                  />
                </g>
              </svg>
            </span>
            <span>Thích</span>
          </button>
          <button className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d">
            <span className="inline-block w-5 h-5">
              <svg
                className="w-full h-full fill-divider_d"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 3C17.5312 3 18 3.21875 18.4062 3.59375C18.7812 4 19 4.46875 19 5V14C19 14.5625 18.7812 15.0312 18.4062 15.4062C18 15.8125 17.5312 16 17 16H12.5L8.59375 18.9375C8.53125 19 8.4375 19 8.34375 19C8.25 19 8.15625 18.9688 8.09375 18.9062C8.03125 18.8438 8 18.75 8 18.625V16H5C4.4375 16 3.96875 15.8125 3.59375 15.4062C3.1875 15.0312 3 14.5625 3 14V5C3 4.46875 3.1875 4 3.59375 3.59375C3.96875 3.21875 4.4375 3 5 3H17ZM18 14V5C18 4.75 17.875 4.5 17.6875 4.3125C17.5 4.125 17.25 4 17 4H5C4.71875 4 4.46875 4.125 4.28125 4.3125C4.09375 4.5 4 4.75 4 5V14C4 14.2812 4.09375 14.5312 4.28125 14.7188C4.46875 14.9062 4.71875 15 5 15H9V17.375L12.1562 15H17C17.25 15 17.5 14.9062 17.6875 14.7188C17.875 14.5312 18 14.2812 18 14Z" />
              </svg>
            </span>
            <span>Bình luận</span>
          </button>
          <button className="cursor-pointer flex border-transparent bg-transparent items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d">
            <span className="inline-block w-5 h-5">
              <svg
                viewBox="0 0 23 22"
                fill="none"
                className="w-full h-full fill-divider_d"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.1585 9.12577C20.3772 9.3758 20.5022 9.68834 20.5022 10.0009C20.5022 10.3447 20.3772 10.626 20.1585 10.876L14.6578 16.6267C14.4077 16.8767 14.0952 17.0017 13.7514 17.0017C13.4076 17.0017 13.1263 16.908 12.8763 16.658C12.6263 16.4079 12.5012 16.1266 12.5012 15.7516V13.0012C10.6885 13.0325 9.40711 13.1263 8.62576 13.3138C7.62564 13.5638 6.96931 14.0326 6.68802 14.689C6.37548 15.3765 6.43799 16.3767 6.84429 17.7206C6.9068 18.0331 6.87555 18.2832 6.71928 18.5332C6.56301 18.7832 6.34423 18.9082 6.06294 18.9707C5.78166 19.0333 5.53163 19.002 5.2816 18.8145C4.5315 18.2832 3.93768 17.6581 3.50012 16.908C2.81254 15.8454 2.5 14.6577 2.5 13.345C2.5 11.6573 2.96881 10.3447 3.93768 9.34454C4.75028 8.50069 6.00044 7.87561 7.62564 7.50056C8.8758 7.18802 10.501 7.03175 12.5012 7.0005V4.25016C12.5012 3.90636 12.6263 3.62508 12.8763 3.37505C13.1263 3.12502 13.4076 3 13.7514 3C14.0952 3 14.4077 3.12502 14.6578 3.37505L20.1585 9.12577ZM19.4396 10.1884C19.4709 10.1259 19.5021 10.0634 19.5021 10.0009C19.5021 9.93837 19.4709 9.87586 19.4396 9.81335L13.9389 4.06263C13.8452 4.00012 13.7514 4.00012 13.6576 4.03138C13.5326 4.09389 13.5014 4.15639 13.5014 4.25016V8.00062C11.4386 8.00062 9.84467 8.09439 8.71953 8.28191C7.09432 8.53194 5.84417 9.032 5.00031 9.75084C4.00019 10.5947 3.50012 11.7823 3.50012 13.345C3.50012 14.4077 3.75016 15.3765 4.28147 16.2204C4.65652 16.908 5.18784 17.5018 5.87542 18.0019C5.37536 16.1891 5.37536 14.8452 5.93793 13.9076C6.43799 13.095 7.37561 12.5637 8.78203 12.2824C9.78216 12.0949 11.3449 12.0011 13.5014 12.0011V15.7516C13.5014 15.8766 13.5326 15.9391 13.6576 15.9704C13.7514 16.0329 13.8452 16.0016 13.9389 15.9391L19.4396 10.1884Z" />
              </svg>
            </span>
            <span>Chia sẻ</span>
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
    </div>
  );
};

export default PostDetail;
