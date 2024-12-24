import { Routes } from '@/constants/enums';
import classNames from 'classnames'; // Sử dụng classNames để hỗ trợ merge class CSS
import clsx from 'clsx';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  /**
   * MaxLine < 1 Sẽ không hiện nút xem thêm
   */
  maxLine?: number;
  className?: string;
  htmlString?: string;
}

/**
 * Đoạn Text có sẵn nút xem thêm
 */
const TextWidthButtonSeeMore: React.FC<IProps> = ({ maxLine = 0, className, htmlString = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const checkOverflow = () => {
    if (contentRef.current) {
      const isContentOverflowing =
        contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsOverflowing(isContentOverflowing);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [htmlString, maxLine]);
  useEffect(() => {
    const handleResize = () => {
      checkOverflow();
      if (isExpanded && contentRef.current && !isOverflowing) setIsExpanded(false); // Thu gọn nếu không còn tràn
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, isOverflowing]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    const className = target.className;
    if (className.search('mention') !== -1) {
      const userId = target.getAttribute('data-id') || target.getAttribute('data-userid');
      if (userId) router.push(`${Routes.User}/${userId}`);
    }
  };

  if (maxLine < 1)
    return (
      <div
        onClick={handleClick}
        className={clsx(
          'text-base [&_p]:mb-0 [&_p:not(:last-child)]:mb-[2px] hover:[&_.mention]:underline hover:[&_.mention]:cursor-pointer',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    );
  const handleToggle = () => setIsExpanded(!isExpanded);
  return (
    <div
      className={classNames(
        'relative text-base [&_p]:mb-0 [&_p:not(:last-child)]:mb-[2px] hover:[&_.mention]:underline hover:[&_.mention]:cursor-pointer',
        className,
      )}
    >
      <div
        ref={contentRef}
        className={classNames('overflow-hidden')}
        onClick={handleClick}
        style={
          !isExpanded
            ? {
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitLineClamp: maxLine,
                lineClamp: maxLine,
              }
            : { wordBreak: 'break-word', overflowWrap: 'break-word' }
        }
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      {(isOverflowing || isExpanded) && (
        <button
          className="px-0 border-none bg-transparent text-link_text_l hover:underline cursor-pointer"
          onClick={handleToggle}
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export { TextWidthButtonSeeMore };
