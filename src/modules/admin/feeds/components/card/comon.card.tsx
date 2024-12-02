import { TextSeeMore } from '@/components/common';
import CopyButton from '@/components/common/copy-button';
import {
  MessengerImage,
  MessengerKNPImage,
  PhoneImage,
  ZaloImage,
} from '@/components/common/image-components';
import { BlueEyeIcon, HeartRedIcon } from '@/components/icons';
import { ImageGrid, PostDetailTypes } from '@/components/reuse/data-display';
import { Routes } from '@/constants/enums';
import { useDivWidth } from '@/hooks/use-div-width';
import { getTimeAgo } from '@/utilities/func.time';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// Header
type AdminFeedsCardHeaderProps = {
  status?: 'pending' | 'approved' | 'rejected';
  post?: PostDetailTypes;
  className?: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
};
const CardHeader: React.FC<AdminFeedsCardHeaderProps> = React.memo(
  ({ post, status, onApprove, onReject, onDelete }) => {
    return (
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10">
            <Image
              className="w-full h-full rounded-full"
              src={post?.author?.avatar ?? '/images/user-default.jpg'}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col">
            <div>
              <Link
                className="text-base font-medium hover:underline text-primary_text_l dark:text-primary_text_d line-clamp-1"
                href={Routes.User + '/' + 1}
              >
                {post?.author?.name ?? 'Chưa có tên'}
              </Link>
            </div>
            <div className="text-secondary_text_l dark:text-secondary_text_d text-sm">
              {getTimeAgo(post?.updated_at)}
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            {(status === 'pending' || status === 'rejected') && (
              <button
                className="border-solid border-color_l border bg-color_l text-white rounded-md px-4 py-2 cursor-pointer hover:bg-white hover:text-color_l"
                onClick={() => {
                  onApprove?.(post?.id ?? 'Approve failed');
                }}
              >
                Duyệt
              </button>
            )}
            {status === 'pending' && (
              <button
                className="border-solid border bg-transparent text-error_l dark:text-error_d border-error_l rounded-md px-4 py-2 cursor-pointer hover:bg-error_l dark:hover:text-white hover:text-white"
                onClick={() => {
                  onReject?.(post?.id ?? 'Reject failed');
                }}
              >
                Từ chối
              </button>
            )}
            {status === 'approved' && (
              <button
                className="border-solid border bg-transparent text-error_l dark:text-error_d border-error_l rounded-md px-4 py-2 cursor-pointer hover:bg-error_l dark:hover:text-white hover:text-white"
                onClick={() => {
                  onDelete?.(post?.id ?? 'Delete failed');
                }}
              >
                Gỡ tin
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);
CardHeader.displayName = 'CardHeader';
//

//Footer
type AdminFeedsCardFooterProps = {
  status?: 'pending' | 'approved' | 'rejected';
  post?: PostDetailTypes;
  className?: string;
};
const CardFooter: React.FC<AdminFeedsCardFooterProps> = React.memo(({ status }) => {
  const { divRef, width } = useDivWidth({ delay: 50 });
  const hiddenLabelContact = width < 580;
  return (
    <div ref={divRef} className="mt-1 flex justify-between">
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <BlueEyeIcon />
          <span>1</span>
        </div>
        <div className="flex items-center gap-1">
          <HeartRedIcon width={14} height={14} />
          <span>1</span>
        </div>
      </div>
      <div className="flex">
        <Link
          href={'tel:0987654321'}
          className={clsx(
            'flex gap-2 text-secondary_text_l hover:text-primary_text_l dark:hover:text-primary_text_d dark:text-secondary_text_d py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md',
            hiddenLabelContact ? 'px-2' : 'px-3',
          )}
        >
          <PhoneImage className="!w-4 !h-4" />
          <span className={hiddenLabelContact ? 'hidden' : ''}>Điện thoại</span>
        </Link>
        <Link
          href={'https://www.facebook.com/messages/t/100010636721382'}
          className={clsx(
            'flex gap-2 text-secondary_text_l hover:text-primary_text_l dark:hover:text-primary_text_d dark:text-secondary_text_d py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md',
            hiddenLabelContact ? 'px-2' : 'px-3',
          )}
        >
          <MessengerImage className="!w-4 !h-4" />
          <span className={hiddenLabelContact ? 'hidden' : ''}>Messenger</span>
        </Link>
        <Link
          href={'tel:0987654321'}
          className={clsx(
            'flex gap-2 text-secondary_text_l hover:text-primary_text_l dark:hover:text-primary_text_d dark:text-secondary_text_d py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md',
            hiddenLabelContact ? 'px-2' : 'px-3',
          )}
        >
          <ZaloImage className="!w-4 !h-4" />
          <span className={hiddenLabelContact ? 'hidden' : ''}>Zalo</span>
        </Link>
        <Link
          href={'tel:0987654321'}
          className={clsx(
            'flex gap-2 text-secondary_text_l hover:text-primary_text_l dark:hover:text-primary_text_d dark:text-secondary_text_d py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md',
            hiddenLabelContact ? 'px-2' : 'px-3',
          )}
        >
          <MessengerKNPImage className="!w-5 !h-4" />
          <span className={hiddenLabelContact ? 'hidden' : ''}>Chat</span>
        </Link>
      </div>
    </div>
  );
});
CardFooter.displayName = 'CardFooter';

// Body
type CardBodyProps = {
  post?: PostDetailTypes;
  className?: string;
  contentMaxLine?: number;
  classNames?: {
    content?: string;
    images?: string;
  };
  onHashTagClick?: (tag: string) => void;
};
const CardBody: React.FC<CardBodyProps> = React.memo(({ post, contentMaxLine, onHashTagClick }) => {
  return (
    <>
      <TextBody content={post?.content ?? ''} maxLine={contentMaxLine} />
      <div className="flex gap-2 mt-1">
        {post?.tags?.map((tag) => (
          <span
            key={tag}
            className="text-link_text_l dark:text-link_text_d hover:cursor-pointer hover:underline font-medium"
            onClick={() => {
              onHashTagClick?.(tag);
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
      {post?.images && post?.images?.length > 0 && <ImageBody images={post?.images} />}
    </>
  );
});

CardBody.displayName = 'CardBody';

const TextBody: React.FC<{ content: string; maxLine?: number }> = ({ content, maxLine = 5 }) => {
  return (
    <div className="mt-3">
      <TextSeeMore
        className="text-base dark:text-primary_text_d"
        _html={content}
        maxLine={maxLine}
      />
      <div className="mt-1">
        <CopyButton content={content} />
      </div>
    </div>
  );
};
type ImageBodyProps = {
  images: string[];
};
const ImageBody: React.FC<ImageBodyProps> = ({ images }) => {
  const { divRef, width } = useDivWidth();
  return (
    <div ref={divRef} className="mt-2">
      <ImageGrid images={images} maxImagePreview={width < 640 ? 3 : 5} canDownload horizontally />
    </div>
  );
};
export { CardBody, CardFooter, CardHeader };
