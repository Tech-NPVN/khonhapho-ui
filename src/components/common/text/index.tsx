'use client';
import { EyeIcon, EyeSlashIcon } from '@/components/icons';
import { Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TextWidthButtonSeeMore } from './see-more';

interface IProps {
  /*
    MaxLine < 1 Sẽ không hiện nút xem thêm
  */
  maxLine?: number;
  className?: string;
  _html?: string;
}

const TextSeeMore: React.FC<IProps> = ({ _html, className, maxLine }) => {
  return (
    <>
      <TextWidthButtonSeeMore htmlString={_html} maxLine={maxLine} className={className} />
    </>
  );
};

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

const MaskedText = ({ text }: { text: string }) => {
  const [isMasked, setIsMasked] = useState<boolean>(true);

  const getMaskedValue = (value: string) => {
    return value.slice(0, 3) + '*'.repeat(value.length - 6) + value.slice(-3);
  };

  const displayedValue = isMasked ? getMaskedValue(text) : text;

  const onMasked = () => {
    setIsMasked((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-link_text_l dark:text-link_text_d">{displayedValue}</span>
      {isMasked ? (
        <EyeSlashIcon className="cursor-pointer" onClick={onMasked} />
      ) : (
        <EyeIcon className="cursor-pointer" onClick={onMasked} />
      )}
    </div>
  );
};

export * from './see-more';
export { MarqueeText, MaskedText, TextSeeMore };
