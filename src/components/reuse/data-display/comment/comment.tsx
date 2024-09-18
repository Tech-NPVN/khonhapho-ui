'use client';

import { modalError } from '@/common/modal';
import { TextSeeMore } from '@/components/common';
import { CommentIcon, HeartRedIcon, ThreeDotIcon } from '@/components/icons';
import { getTimeAgo } from '@/utilities/func.time';
import { Modal, Popover } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ImageSlider } from '../images';
import { CommentInput } from './comment-input';
import { ModalCommentList } from './modal-comment-list';
export interface CommentTypes {
  id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
  child_comments?: CommentTypes[];
  body?: string;
  image?: string;
  like_count?: number;
  isLiked?: boolean;
  isUpdated?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ICommentProps {
  comment?: CommentTypes;
  isLiked?: boolean;
  isPreview?: boolean;
  className?: string;
  isChild?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onReplyClick?: (e?: React.MouseEvent<HTMLButtonElement>) => boolean | void;
  onEdit?: (comment?: CommentTypes) => void;
  onDelete?: (comment?: CommentTypes) => void;
  onReply?: (comment?: CommentTypes) => void;
}
const ThreeDotComment = ({
  onDelete,
  onEdit,
  className,
}: {
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const content = (
    <div>
      <div
        className="px-6 py-1 hover:bg-black/5 dark:bg-white/5 rounded cursor-pointer"
        onClick={() => {
          onEdit?.();
        }}
      >
        Sửa
      </div>
      <div
        className="px-6 py-1 hover:bg-black/5 dark:bg-white/5 rounded cursor-pointer text-error_l dark:text-error_d"
        onClick={() => {
          onDelete?.();
        }}
      >
        Xoá
      </div>
    </div>
  );
  return (
    <div
      className={clsx(
        'w-8 h-8 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer justify-center items-center flex rounded-full',
        className,
      )}
      ref={componentRef}
    >
      <Popover
        content={content}
        title=""
        trigger="click"
        placement="bottom"
        rootClassName="[&_.ant-popover-inner]:!p-1 "
      >
        <div className="w-full h-full p-2 flex justify-center items-center">
          <ThreeDotIcon height={3} width={18} className="rotate-90" />
        </div>
      </Popover>
    </div>
  );
};
const Comment = ({
  comment,
  className,
  isLiked = false,
  isPreview = false,
  isChild,
  onClick,
  onReplyClick,
  onDelete,
  onReply,
}: ICommentProps) => {
  const [currentComment, setCurrentComment] = useState(comment);
  const [liked, setLiked] = useState(isLiked);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isShowThreeDot, setIsShowThreeDot] = useState(false);
  const handleEditSubmit = (cmt?: CommentTypes) => {
    setIsEdit(false);
    setCurrentComment((prev) => ({ ...prev, ...cmt, isUpdated: true }));
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    setCurrentComment(comment);
  }, [comment]);

  const handleDelete = () => {
    modalError({
      title: 'Bạn có muốn xoá bình luận này không?',
      onOk() {
        onDelete?.(comment);
        Modal.destroyAll();
        // Call api
      },
      onCancel() {},
      centered: true,
    });
  };
  const handleReplySubmit = (cmt?: CommentTypes) => {
    if (!cmt) return;
    const newComment = {
      ...cmt,
      id: new Date().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setIsReply(false);
    if (isChild) {
      onReply?.(newComment);
      return;
    }
    // Call api
    const comments = currentComment?.child_comments ? [...currentComment?.child_comments] : [];
    comments.unshift(newComment);
    setCurrentComment((prev) => ({ ...prev, child_comments: comments }));
  };
  const isShowLiked = currentComment?.body && currentComment.body != '<p></p>';
  console.log(isShowThreeDot);

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx('flex items-start', isChild ? ' w-[calc(100%-5px)]' : 'w-full')}
        onMouseEnter={() => setIsShowThreeDot(true)}
        onMouseLeave={() => {
          setIsShowThreeDot(false);
        }}
      >
        <Link href={'/user/0389619050'}>
          <div className={''}>
            <Image
              className={clsx('rounded-full mr-3', isChild ? 'w-7 h-7' : 'w-10 h-10')}
              width={40}
              height={40}
              src={currentComment?.user?.avatar || '/images/user-default.jpg'}
              alt={currentComment?.user?.name || 'User'}
            />
          </div>
        </Link>
        {!isEdit && (
          <div className="flex">
            <div>
              <div className="flex">
                <div
                  className="bg-background_l_2 dark:bg-background_d p-2 rounded-lg flex flex-col relative"
                  onClick={() => {
                    onClick && onClick();
                  }}
                >
                  <div>
                    <div className="font-semibold text-sm dark:text-primary_text_d">
                      <Link
                        className="text-black dark:text-primary_text_d flex gap-2 hover:underline"
                        href={'/user/0389619050'}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span>{currentComment?.user?.name || 'Nguyễn Văn A'}</span>
                        <span>•</span>
                        <span>NPVN-2019</span>
                      </Link>
                    </div>
                    <div
                      className={clsx(
                        ' text-gray-800 dark:text-primary_text_d font-normal text-sm [&_p]:mb-0',
                        currentComment?.body && currentComment?.body != '<p></p>' ? 'mt-1' : 'mt-0',
                      )}
                    >
                      <TextSeeMore
                        _html={currentComment?.body}
                        maxLine={7}
                        className="max-w-full break-words break-all max-sm:text-base"
                      />
                    </div>
                  </div>
                  {isShowLiked && (liked || comment?.like_count) && (
                    <div className="absolute -bottom-1 right-0 translate-x-1/2 bg-white h-4 min-w-4 rounded-full flex justify-center items-center dark:bg-primary_color_d shadow">
                      <div className="w-4 h-4">
                        <HeartRedIcon width={16} height={16} />
                      </div>
                      {comment?.like_count && comment.like_count + (liked ? 1 : 0) > 1 && (
                        <span className="min-w-4 h-4 justify-center flex">
                          {comment.like_count + (liked ? 1 : 0)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {!isEdit && !isPreview && (
                  <div className="w-10 min-w-10 flex justify-center items-start">
                    <div className="flex justify-center items-center flex-col three-dot">
                      {isShowThreeDot && (
                        <ThreeDotComment
                          onEdit={() => {
                            setIsEdit(true);
                            if (isReply) setIsReply(false);
                          }}
                          onDelete={() => {
                            handleDelete();
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <CommentImage comment={currentComment} liked={liked} />
              </div>
              <div className="min-h-4 items-center mt-1 ms-1">
                <div className="flex gap-3 text-primary_text_l/50 dark:text-primary_text_d/50">
                  <button
                    className={clsx(
                      'border-none bg-transparent cursor-pointer text-[12px] font-semibold',
                      liked ? 'text-[#F95E73] dark:text-[#F95E73]' : ' dark:text-primary_text_d',
                    )}
                    onClick={() => {
                      setLiked(!liked);
                    }}
                  >
                    Thích
                  </button>
                  <button
                    className="border-none bg-transparent cursor-pointer text-[12px] font-semibold"
                    onClick={(e) => {
                      const check = onReplyClick?.(e);
                      if (!check) setIsReply(true);
                    }}
                  >
                    Trả lời
                  </button>
                  <span className="text-[12px]">{getTimeAgo(currentComment?.created_at)}</span>
                  {currentComment?.isUpdated && <span className="text-[12px]">Đã chỉnh sửa</span>}
                </div>
              </div>
            </div>
          </div>
        )}
        {isEdit && (
          <div className="w-full max-w-[calc(100%-50px)]">
            <CommentInput
              defaultComment={currentComment}
              onSendComment={handleEditSubmit}
              showCancel
              onCancel={handleCancelClick}
              autoFocus
            />
          </div>
        )}
      </div>
      {isReply && (
        <div className="flex">
          <div className="w-[50px] min-w-[50px]"></div>
          <div className="w-full max-w-[calc(100%-50px)]">
            <CommentInput
              onSendComment={(cmt) => {
                handleReplySubmit(cmt);
              }}
              showCancel
              onCancel={() => {
                setIsReply(false);
              }}
              autoFocus
            />
          </div>
        </div>
      )}
      <div className="ms-10 sm:ms-[60px]">
        <ListCommentChildren
          comments={currentComment?.child_comments}
          handleReplySubmit={handleReplySubmit}
        />
      </div>
    </div>
  );
};
const ListCommentChildren = ({
  comments,
  handleReplySubmit,
}: {
  comments?: CommentTypes[];
  handleReplySubmit?: (comment: CommentTypes) => void;
}) => {
  const [isMini, setIsMini] = useState<boolean>((comments?.length || 0) >= 2);
  return (
    <>
      {isMini && comments && (
        <div className="flex-col gap-1 flex my-3">
          <div className="flex">
            <Link
              href={'/user/0389619050'}
              className="min-w-8 min-h-8 w-8 h-8 flex items-center justify-center"
            >
              <Image
                alt="avatar"
                src={'/images/user-default.jpg'}
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-full"
              />
            </Link>
            <div className="flex items-center gap-2 ms-2">
              <div>
                <Link
                  className="text-black dark:text-primary_text_d font-semibold text-nowrap hover:underline"
                  href={'/user/0389619050'}
                >
                  Trọng Nhà Phố
                </Link>
              </div>
              <div
                className="line-clamp-1 [&_p]:mb-[2px]"
                dangerouslySetInnerHTML={{
                  __html: comments[0].body || 'Bình luận bằng 1 hình ảnh',
                }}
              ></div>
            </div>
          </div>
          {comments?.length > 1 && (
            <div
              className="cursor-default text-sm hover:underline"
              onClick={() => {
                setIsMini(false);
              }}
            >
              Xem thêm {comments?.length - 1} phản hồi khác
            </div>
          )}
        </div>
      )}
      {!isMini &&
        comments?.map((cmt) => (
          <Comment
            key={cmt.id}
            comment={cmt}
            className="mt-3"
            isChild
            onReply={(reply) => {
              if (reply) handleReplySubmit?.(reply);
            }}
          />
        ))}
    </>
  );
};
const CommentImage = ({ liked, comment }: { liked?: boolean; comment?: CommentTypes }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imgClass, setImgClass] = useState('');
  const isShowLiked = !(comment?.body && comment.body != '<p></p>');
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.naturalWidth > img.naturalHeight) {
      setImgClass('w-[200px] h-auto');
    } else {
      setImgClass('h-[200px] w-auto');
    }
  }, [comment?.image]);
  if (!comment?.image) return null;
  return (
    <>
      <div className="flex">
        <div className="relative">
          <Image
            className={clsx('cursor-pointer object-contain rounded-lg', imgClass)}
            ref={imgRef}
            width={200}
            height={200}
            src={comment?.image}
            alt={comment?.image}
            onClick={() => {
              setIsOpen(true);
            }}
          />
          {isShowLiked && (liked || comment?.like_count) && (
            <div className="absolute -bottom-1 right-1 translate-x-1/2 bg-white h-4 min-w-4 rounded-full flex justify-center items-center dark:bg-primary_color_d shadow">
              <div className="w-4 h-4">
                <HeartRedIcon width={16} height={16} />
              </div>
              {comment?.like_count && comment.like_count + (liked ? 1 : 0) > 1 && (
                <span className="min-w-4 h-4 justify-center flex">
                  {comment.like_count + (liked ? 1 : 0)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <ModalCustom
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        imageUrl={comment.image}
      />
    </>
  );
};
const ModalCustom: React.FC<{
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}> = ({ isOpen, imageUrl, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ImageSlider
        images={[imageUrl]}
        open
        onClose={() => {
          onClose?.();
        }}
      />
    </>,
    document.body,
  );
};
const CommentComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="w-full h-full flex items-center gap-2 flex-1 justify-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className="inline-block w-5 h-5">
          <CommentIcon></CommentIcon>
        </span>
        <span>Bình luận</span>
      </div>
      {isOpen && (
        <ModalCommentList
          open
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};

export { Comment, CommentComponent };
