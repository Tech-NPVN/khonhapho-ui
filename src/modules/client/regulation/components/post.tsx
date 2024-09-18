'use client';

import { TextSeeMore } from '@/components/common';
import { BlueEyeIcon, HeartRedIcon } from '@/components/icons';
import {
  Comment,
  CommentTypes,
  ImageGrid,
  ModalCommentList,
} from '@/components/reuse/data-display';
import LikeShareComment from '@/components/reuse/data-display/post/like-share-comment';
import { ThreeDot, ThreeDotEventProps } from '@/components/reuse/data-display/post/three-dot';
import { Routes } from '@/constants/enums';
import { getTimeAgo } from '@/utilities/func.time';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface RegulationTypes {
  id?: string;
  title?: string;
  content?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  view_count?: number;
  comment_count?: number;
  like_count?: number;
  comments?: CommentTypes[];
}

type IPostDetailProps = {
  post?: RegulationTypes;
  classNames?: {
    root?: string;
  };
  isWarehouse?: boolean;
  isUrgently?: boolean;
  className?: string;
  threeDot?: boolean;
  threeDotEvents?: ThreeDotEventProps;
};

const RegulationPost = ({
  post,
  isWarehouse,
  isUrgently,
  threeDotEvents,
  className,
}: IPostDetailProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post?.like_count || 0);
  const [comments, setComments] = useState<CommentTypes[]>();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLikeCount(post?.like_count || 0);
    setComments(post?.comments);
  }, [post]);
  const commentCount = post?.comments?.length || 0;
  const imagesCount = post?.images?.length || 0;

  return (
    <>
      <div
        ref={rootRef}
        className={clsx(
          'bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-2 sm:py-4',
          commentCount === 0 ? '!pb-0' : '',
          className,
        )}
      >
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
                    <span>{post?.category}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={clsx('absolute top-0 right-0', isWarehouse ? 'hidden' : '')}>
              <ThreeDot isUrgently={isUrgently} threeDotEvents={threeDotEvents} />
            </div>
          </div>
          <div className="mt-2">
            <TextSeeMore _html={post?.title} className="[&_p]:mb-[2px]" />
          </div>
          <div className="">
            <TextSeeMore _html={post?.content} maxLine={5} className="[&_p]:mb-[2px]" />
          </div>
          <div className={clsx('mt-2')}>
            <div className={'flex-wrap gap-2 flex'}>
              {post?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-link_text_l cursor-pointer hover:underline lowercase"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={clsx('mt-2', imagesCount > 0 ? '' : 'hidden')}>
          <div>
            <ImageGrid images={post?.images || []} isWarehouse={isWarehouse} />
          </div>
        </div>
        <div className="w-full px-3 sm:px-4">
          <div
            className={clsx(
              imagesCount > 0 ? 'mt-1' : 'mt-2',
              !likeCount && !post?.view_count ? 'hidden' : 'mb-2',
              likeCount === 0 && post?.view_count === 0 ? 'hidden' : '',
            )}
          >
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
            </div>
          </div>

          <div>
            <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
            <LikeShareComment setLikeCount={setLikeCount} liked={isLiked} setLiked={setIsLiked} />
            {commentCount > 0 && (
              <div className="w-full h-[1px] bg-divider_l dark:bg-divider_d"></div>
            )}
          </div>
          {commentCount > 0 && (
            <div className="mt-4">
              <div className="w-full flex flex-col gap-2">
                {comments?.[0] && (
                  <Comment
                    comment={comments?.[0]}
                    onClick={() => {
                      setIsOpenModalComment(true);
                    }}
                    onReplyClick={() => {
                      setIsOpenModalComment(true);
                      return true;
                    }}
                    isPreview
                  />
                )}
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
export { RegulationPost };
export type { IPostDetailProps, RegulationTypes };
