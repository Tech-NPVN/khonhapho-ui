'use client';
import { isTextClamped, replaceAnchorWithIframe } from '@/utilities/func.text';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  /*
    MaxLine < 1 Sẽ không hiện nút xem thêm
    */
  maxLine?: number;
  className?: string;
  _html?: string;
}

const TextSeeMore = React.memo(
  ({ maxLine, className, _html }: IProps) => {
    const [isShowMore, setIsShowMore] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (contentRef.current && !isShowMore) {
        if (!maxLine || (maxLine && maxLine < 1)) setIsHidden(false);
        else setIsHidden(isTextClamped(contentRef.current));
      }
    }, [contentRef, maxLine, _html, isShowMore]);

    useEffect(() => {
      if (!maxLine || (maxLine && maxLine < 1)) setIsShowMore(true);
    }, [maxLine]);

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
  },
  (prevProps, nextProps) => {
    // So sánh các props để tránh re-render nếu không cần thiết
    return (
      prevProps.maxLine === nextProps.maxLine &&
      prevProps.className === nextProps.className &&
      prevProps._html === nextProps._html
    );
  },
);
TextSeeMore.displayName = 'TextSeeMore';

const MarqueeText: React.FC<{ className?: string; text: string }> = ({ className, text }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timeIdRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    const textEl = textRef.current;

    if (marqueeEl && textEl) {
      if (marqueeEl?.clientWidth < textEl?.scrollWidth) {
        let count = 0;
        if (timeIdRef.current) clearInterval(timeIdRef.current);
        timeIdRef.current = setInterval(() => {
          let translateX = count / 10;
          if (textEl?.scrollWidth - translateX < marqueeEl?.clientWidth) {
            // if (timeoutId) return;
            // timeoutId =
            setTimeout(() => {
              count = -300;
              textEl.style.transform = `translateX(0px)`;
            }, 300);
          }
          if (count >= 0) textEl.style.transform = `translateX(-${translateX}px)`;
          count++;
        }, 5);
      }
    }
  }, [text]);

  return (
    <Tooltip placement="top" title={text}>
      <div className={className} ref={marqueeRef}>
        <div ref={textRef}>{text}</div>
      </div>
    </Tooltip>
  );
};
export { MarqueeText, TextSeeMore };
