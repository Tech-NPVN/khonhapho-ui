'use client';

import clsx from 'clsx';
import { forwardRef, memo, useState } from 'react';
import { useMeasure } from 'react-use';
import { CommentInput } from '../input';
import { insertMentionsToTipTap } from '../tiptap/tiptap-helpers';
import { CommentType } from '../types';
import { CommentAvatar } from './avatar';
import { CommentContent } from './content';
import CommentImage from './image';
import CommentInteract from './interact';
import CommentMenu from './menu';
import CommentReplies from './replies';
import './style.css';
import { CommentUserName } from './user-name';
type CommentProps = {
  className?: string;
  comment: CommentType;
  isPreview?: boolean; // nếu có khi ấn vào trả lời sẽ hiện popup
  onReply?: (comment?: CommentType) => boolean; // nếu true thì huỷ sự kiện mặc định
  onReplyClick?: (comment?: CommentType) => void; // chỉ có tác dụng ở preview
  onDelete?: (comment?: CommentType) => void; //
};

/** (Component) Bình luận */
const Comment = memo(
  forwardRef<HTMLDivElement, CommentProps>(
    ({ isPreview, className, onReplyClick, onReply, onDelete, ...props }, ref) => {
      const [comment, setComment] = useState<CommentType>(props.comment);
      const [likeComment, setLikeComment] = useState<boolean>(false);
      const [isShowInputEdit, setIsShowInputEdit] = useState<boolean>(false);
      const [isShowInputReply, setIsShowInputReply] = useState<boolean>(false);
      const [rootRef, { width: rootWidth }] = useMeasure<HTMLDivElement>();

      const handleReply = (cmt?: CommentType) => {
        if (!cmt) return;
        const newComment = { ...cmt, id: Math.random().toString().substring(3, 10) };
        const replies = comment.replies ? [...comment.replies] : [];
        replies.unshift(newComment);
        setComment((prev) => ({ ...prev, replies } as CommentType));
      };
      const isMobile = rootWidth < 481;

      return (
        <div ref={rootRef} className="w-full comment-item">
          <div
            className={clsx('w-full flex', isMobile ? 'gap-[6px]' : ' gap-3', className)}
            ref={ref}
          >
            <CommentAvatar
              className="mt-1"
              src={comment.author?.avatarSrc ?? '/images/user-default.jpg'}
              user_id={comment.author?.id}
            />
            {!isShowInputEdit && (
              <div className="flex-1 flex flex-col">
                <div className="flex w-full group">
                  <div className="flex-1">
                    <div className="flex">
                      <div className="flex flex-col bg-background_l_2 dark:bg-background_d p-2 rounded-lg relative max-w-full">
                        <CommentUserName
                          id={comment.author?.id}
                          name={comment.author?.name}
                          department={'NPVN-2024'}
                          department_id={'npvn'}
                        />
                        <CommentContent comment={comment} liked={likeComment} />
                      </div>
                      <div className="sm:opacity-0 mx-1 transition-opacity duration-150 ease-in-out group-hover:opacity-100">
                        <CommentMenu
                          comment={comment}
                          onUpdateClick={() => {
                            setIsShowInputReply(false);
                            setIsShowInputEdit(true);
                          }}
                          onDeleteClick={onDelete}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <CommentImage comment={comment} liked={likeComment} />
                </div>
                <div className={clsx(comment.image ? 'mt-2' : 'mt-0')}>
                  <CommentInteract
                    comment={comment}
                    onReplyClick={(cmt) => {
                      onReplyClick?.(cmt);
                      setIsShowInputReply(true);
                    }}
                    liked={likeComment}
                    onLikeClick={() => setLikeComment(!likeComment)}
                  />
                </div>
                {isShowInputReply && (
                  <>
                    <div
                      className={clsx(
                        'mt-1',
                        isMobile
                          ? className?.includes('comment-child')
                            ? '-ms-20'
                            : '-ms-11'
                          : '',
                      )}
                    >
                      <CommentInput
                        showCancel
                        onReady={(editor) => {
                          setTimeout(() => {
                            insertMentionsToTipTap(editor, {
                              id: comment.author?.id,
                              label: comment.author?.name,
                            });
                          }, 10);
                        }}
                        onSendComment={(cmt) => {
                          setIsShowInputReply(false);
                          if (onReply?.(cmt)) return;
                          handleReply(cmt);
                        }}
                        onCancel={() => setIsShowInputReply(false)}
                      />
                    </div>
                  </>
                )}
                <div>
                  <CommentReplies
                    replies={comment.replies || []}
                    onReply={(newComment) => {
                      handleReply(newComment);
                      return true;
                    }}
                  />
                </div>
              </div>
            )}
            {isShowInputEdit && (
              <div className="flex-1 flex flex-col">
                <CommentInput
                  autoFocus
                  showCancel
                  defaultComment={comment}
                  onCancel={() => setIsShowInputEdit(false)}
                  onSendComment={(newComment) => {
                    setComment((prev) => newComment || prev);
                    setIsShowInputEdit(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
    },
  ),
);

Comment.displayName = 'Comment';

export { Comment, type CommentProps };
