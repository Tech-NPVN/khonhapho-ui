'use client';

import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import { BlueEyeIcon, HeartRedIcon } from '@/components/icons';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { useMeasure } from 'react-use';
import { Comment, CommentTypes, ModalCommentList } from '../comment';
import { LikeShareComment } from '../post';
import { Default } from './default';
import FeedLoading from './loading';
import { FeedProps } from './type';
import { Urgently } from './urgently';
import { Warehouse } from './warehouse';

/** Chi tiết bài viết dạng Feed */
const Feed: React.FC<FeedProps> = ({
  post,
  threeDotEvents,
  className,
  type = 'default',
  onHashtagClick,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenModalComment, setIsOpenModalComment] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post?.like_count || 0);
  const [comments, setComments] = useState<CommentTypes[]>();
  const commentCount = post?.comments?.length || 0;
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  if (!post) return <FeedLoading />;
  return (
    <>
      <div
        ref={ref}
        className={clsx(
          'bg-white dark:bg-primary_color_d w-full sm:rounded-lg rounded-none py-4 max-w-[864px]',
          type === 'warehouse' ? '!pt-0' : '',
          !comments || comments?.length === 0 ? '!pb-0' : '',
          className,
        )}
      >
        {type === 'default' && (
          <Default post={post} onHashtagClick={onHashtagClick} threeDotEvents={threeDotEvents} />
        )}
        {type === 'warehouse' && (
          <Warehouse post={post} onHashtagClick={onHashtagClick} threeDotEvents={threeDotEvents} />
        )}
        {type === 'urgently' && (
          <Urgently post={post} onHashtagClick={onHashtagClick} threeDotEvents={threeDotEvents} />
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
                  <span className={clsx('inline-block text-nowrap', width < 481 ? 'hidden' : '')}>
                    Chat
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/messages/t/100010636721382"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <MessengerImage className="w-4 h-4" />
                  <span className={clsx('inline-block text-nowrap', width < 481 ? 'hidden' : '')}>
                    Messenger
                  </span>
                </a>
                <a
                  href="https://zalo.me/0389619050"
                  target="_blank"
                  className="flex gap-1 items-center hover:bg-background_l_2 rounded-md px-2 py-2 text-sm dark:text-primary_text_d text-secondary_text_l dark:hover:text-primary_text_d dark:hover:bg-background_d"
                >
                  <ZaloImage className="w-4 h-4" />
                  <span className={clsx('inline-block text-nowrap', width < 481 ? 'hidden' : '')}>
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
                  <span className={clsx('inline-block text-nowrap', width < 481 ? 'hidden' : '')}>
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

export default Feed;
