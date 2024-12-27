'use client';
import { Comment } from '@/components/common/comment';
import { CommentInput } from '@/components/common/comment/input';
import { CommentType } from '@/components/common/comment/types';
import { XIcon } from '@/components/icons';
import { Divider, Empty } from 'antd';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

interface IProps {
  open?: boolean;
  isLockComment?: boolean;
  onClose?: () => void;
}

const initComments: CommentType[] = [
  {
    id: '1',
    text: 'Nhà này rất đẹp nên mua',
    created_at: new Date('2024-04-09').toISOString(),
    updated_at: new Date('2024-05-09').toISOString(),
    replies: [
      {
        id: 'cmm1',
        text: 'Căn này đã bán chưa chị Căn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chị',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
        author: { id: 999, name: 'Đầu Chủ Hồng Ngọc', avatarSrc: '/images/post-3.jpeg' },
      },
      {
        id: 'cmm3',
        text: 'Lorem ipsum dolor sit amet',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
        author: { id: 123, name: 'Đầu Chủ Thuý Kiều', avatarSrc: '/images/post-4.jpeg' },
      },
    ],
    like_count: 10,
    author: {
      id: 456,
      name: 'Đầu Chủ Mạnh Hà',
      avatarSrc: '/images/post-1.jpeg',
    },
  },
  {
    id: '2',
    text: 'Căn này đã bán chưa chị',
    created_at: new Date('2024-07-02').toISOString(),
    updated_at: new Date('2024-08-09').toISOString(),
    author: {
      id: 990,
      name: 'Đầu Chủ Ngọc Ninh',
      avatarSrc: '/images/post-5.jpeg',
    },
  },
];
// modal-comments modal-header
const ModalCommentList = ({ open, isLockComment, onClose }: IProps) => {
  const [comments, setComments] = useState<CommentType[]>(initComments);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const commentsRef = useRef<HTMLDivElement>(null);
  const handleSendComment = (comment?: CommentType) => {
    if (!comment) return;
    const newComment: CommentType = {
      ...comment,
      id: Math.random().toString(),
      created_at: comment.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    commentsRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleClose = () => {
    onClose?.();
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('comment-overflow-y-hidden');
      if (window.location.hash !== '#modal-comment')
        history.pushState(
          null,
          '',
          window.location.pathname + window.location.search + '#modal-comment',
        );
    } else {
      document.body.classList.remove('comment-overflow-y-hidden');
    }
    return () => {
      document.body.classList.remove('comment-overflow-y-hidden');
    };
  }, [open]);

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== '#modal-comment') {
        onClose?.();
      }
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);

  const popupHeight = windowWidth < 640 ? windowHeight : windowHeight - 180;
  return (
    <>
      <div
        className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-[101] cursor-default"
        onClick={handleClose}
      ></div>
      <div
        className={clsx(
          'fixed z-[120] my-auto top-0 cursor-default rounded-none sm:rounded-lg ',
          'w-full sm:w-[620px] md:w-[768px] bg-white dark:bg-primary_color_d text-left',
          'animate-grow-in  transition-all duration-300 linear',
        )}
        style={{
          minHeight: windowWidth < 640 ? popupHeight + 'px' : popupHeight + 'px',
          top: windowWidth < 640 ? 0 + 'px' : 90 + 'px',
        }}
      >
        <div className="flex justify-between items-center mx-3 my-3 modal-header">
          <h3 className="text-xl font-semibold mb-0">Bình luận</h3>
          <div
            className="w-8 h-8 cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex justify-center items-center"
            onClick={handleClose}
          >
            <XIcon width={18} height={18} />
          </div>
        </div>
        <Divider className="m-0" />
        <div
          className="w-full h-full max-h-full grid"
          style={{
            gridTemplateRows: 'auto 1fr auto',
            height: popupHeight - 34 + 'px',
          }}
        >
          <div className="w-full h-[1px] bg-black/5 dark:bg-divider_d"></div>
          <div className="px-3 py-3 overflow-y-auto gap-1 modal-comments" ref={commentsRef}>
            <div className="flex flex-col gap-3">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <Comment
                    className=""
                    comment={comment}
                    onDelete={(cmt) => {
                      setComments((prev) => prev.filter((c) => c.id !== cmt?.id));
                    }}
                  />
                </div>
              ))}
            </div>
            {!comments ||
              (comments.length === 0 && (
                <div className="w-full h-full flex justify-center items-center">
                  <Empty className="" description="Chưa có bình luận nào" />
                </div>
              ))}
          </div>
          {isLockComment ? (
            <div className="w-full text-center">Chức năng bình luận đã bị khoá</div>
          ) : (
            <div className="m-3 sticky bottom-0 bg-white dark:bg-primary_color_d pt-1 pb-2">
              <CommentInput onSendComment={handleSendComment} showAvatar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export { ModalCommentList };
