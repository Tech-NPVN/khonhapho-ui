'use client';
import { XIcon } from '@/components/icons';
import { Divider } from 'antd';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Comment, CommentTypes } from './comment';
import { CommentInput } from './comment-input';

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

const initComments: CommentTypes[] = [
  {
    id: '1',
    body: 'Nhà này rất đẹp nên mua',
    created_at: new Date('2024-04-09').toISOString(),
    updated_at: new Date('2024-05-09').toISOString(),
    child_comments: [
      {
        id: 'cmm1',
        body: 'Căn này đã bán chưa chị Căn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chịCăn này đã bán chưa chị',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
      },
      {
        id: 'cmm3',
        body: 'Lorem ipsum dolor sit amet',
        created_at: new Date('2024-07-02').toISOString(),
        updated_at: new Date('2024-08-09').toISOString(),
      },
    ],
  },
  {
    id: '2',
    body: 'Căn này đã bán chưa chị',
    created_at: new Date('2024-07-02').toISOString(),
    updated_at: new Date('2024-08-09').toISOString(),
  },
];

const ModalCommentList = ({ open, onClose }: IProps) => {
  const [comments, setComments] = useState<CommentTypes[]>(initComments);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const commentsRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const dragDirection = useRef<'horizontal' | 'vertical' | null>(null);

  const checkScrollPosition = () => {
    const element = commentsRef.current;
    if (!element) return { atBottom: false, atTop: false };
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 15;
    const atTop = element.scrollTop === 0;
    return { atBottom, atTop };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { atBottom, atTop } = checkScrollPosition();
    if (atTop || atBottom) {
      isDragging.current = true;
      startPosition.current.y = e.clientY - position.y;
      startPosition.current.x = e.clientX - position.x;
      dragDirection.current = null; // Reset the drag direction when starting a new drag
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const deltaX = e.clientX - startPosition.current.x;
      const deltaY = e.clientY - startPosition.current.y;

      if (!dragDirection.current) {
        // Determine drag direction on first significant move
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          dragDirection.current = 'horizontal';
        } else {
          dragDirection.current = 'vertical';
        }
      }

      // Handle dragging based on determined direction
      if (dragDirection.current === 'horizontal') {
        setPosition((prev) => ({ ...prev, x: deltaX }));
      } else if (dragDirection.current === 'vertical') {
        setPosition((prev) => ({ ...prev, y: deltaY }));
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const deltaX = e.touches[0].clientX - startPosition.current.x;
      const deltaY = e.touches[0].clientY - startPosition.current.y;

      if (!dragDirection.current) {
        // Determine drag direction on first significant move
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          dragDirection.current = 'horizontal';
        } else {
          dragDirection.current = 'vertical';
        }
      }

      // Handle dragging based on determined direction
      if (dragDirection.current === 'horizontal') {
        setPosition((prev) => ({ ...prev, x: deltaX }));
      } else if (dragDirection.current === 'vertical') {
        const { atBottom, atTop } = checkScrollPosition();
        if (!((atTop && deltaY < 0) || (atBottom && deltaY > 0))) {
          setPosition((prev) => ({ ...prev, y: deltaY }));
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startPosition.current.y = e.touches[0].clientY - position.y;
    startPosition.current.x = e.touches[0].clientX - position.x;
    dragDirection.current = null; // Reset the drag direction when starting a new drag
  };

  const handleMouseUp = () => {
    dragDirection.current = null;
    isDragging.current = false;
    const mHeight = windowSize.height * 0.35;
    const mWidth = windowSize.width * 0.45;
    if (position.y > mHeight) {
      setPosition({ x: 0, y: windowSize.height });
      setTimeout(() => {
        handleClose();
      }, 300);
    } else if (position.y < -mHeight) {
      setPosition({ x: 0, y: -windowSize.height });
      setTimeout(() => {
        handleClose();
      }, 300);
    } else if (position.x > mWidth) {
      setPosition({ y: 0, x: windowSize.width });
      setTimeout(() => {
        handleClose();
      }, 300);
    } else if (position.x < -mWidth) {
      setPosition({ y: 0, x: -windowSize.width });
      setTimeout(() => {
        handleClose();
      }, 300);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleSendComment = (comment: CommentTypes) => {
    const newComment: CommentTypes = {
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
    window.history.pushState(null, '', '#');
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('comment-overflow-y-hidden');
      if (window.location.hash !== '#modal-comment')
        window.history.pushState(null, '', '#modal-comment');
    } else {
      document.body.classList.remove('comment-overflow-y-hidden');
    }
    return () => {
      document.body.classList.remove('comment-overflow-y-hidden');
    };
  }, [open]);

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash !== '#modal-comment') onClose?.();
    };
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [onClose]);

  const popupHeight = windowSize.width < 640 ? windowSize.height : windowSize.height - 180;
  const moreStyle =
    windowSize.width >= 640 ? {} : { top: `${position.y}px`, left: `${position.x}px` };
  return (
    <>
      <div className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-[101] cursor-default"></div>
      <div
        className={clsx(
          'animate-grow-in fixed z-[120] my-auto top-0 sm:top-[12.5vh] rounded-lg cursor-default',
          'w-full sm:w-[620px] md:w-[768px] bg-white text-left',
          'rounded-none sm:rounded-lg',
          isDragging.current ? 'select-none' : 'transition-all duration-300',
        )}
        style={{
          minHeight: windowSize.width < 640 ? popupHeight + 'px' : popupHeight + 'px',
          ...moreStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      >
        <div className="flex justify-between items-center mx-3 my-3">
          <h3 className="text-xl font-semibold mb-0">Bình luận</h3>
          <div className="w-8 h-8 cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex justify-center items-center">
            <XIcon width={18} height={18} onClick={handleClose} />
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
                <Comment
                  className=""
                  key={comment.id}
                  comment={comment}
                  onDelete={(cmt) => {
                    setComments((prev) => prev.filter((c) => c.id !== cmt?.id));
                  }}
                />
              ))}
            </div>
          </div>
          <div className="m-3 sticky bottom-0 pb-1 bg-white dark:bg-primary_color_d pt-1">
            <CommentInput onSendComment={handleSendComment} showAvatar />
          </div>
        </div>
      </div>
    </>
  );
};

export { ModalCommentList };
