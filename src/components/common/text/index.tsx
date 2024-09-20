'use client';
import { isTextClamped, replaceAnchorWithIframe } from '@/utilities/func.text';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface IProps {
  /*
    MaxLine < 1 Sẽ không hiện nút xem thêm
    */
  maxLine?: number;
  className?: string;
  _html?: string;
}

const TextSeeMore = ({ maxLine, className, _html }: IProps) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current && !isShowMore) {
      if (!maxLine || (maxLine && maxLine < 1)) setIsHidden(false);
      else setIsHidden(isTextClamped(contentRef.current));
    }
  }, [contentRef, maxLine, _html, isShowMore]);

  return (
    <div className="[&_p]:mb-[2px]">
      <div
        ref={contentRef}
        className={clsx(
          'text-base dark:text-primary_text_d !select-text',
          isShowMore ? 'line-clamp-none' : 'line-clamp-[9]',
          className,
        )}
        style={{
          lineClamp: maxLine,
          WebkitLineClamp: maxLine,
        }}
        dangerouslySetInnerHTML={{ __html: replaceAnchorWithIframe(_html || '') }}
      ></div>
      <button
        onClick={() => {
          setIsShowMore((prev) => !prev);
        }}
        className={clsx(
          isHidden ? 'block' : 'hidden',
          'px-0 text-base rounded-lg font-medium text-link_text_l hover:underline bg-transparent border-0 cursor-pointer',
        )}
      >
        {isShowMore ? 'Thu gọn' : 'Xem thêm'}
      </button>
    </div>
  );
};
export { TextSeeMore };
