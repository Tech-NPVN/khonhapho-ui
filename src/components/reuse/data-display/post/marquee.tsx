import { Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

const Marquee: React.FC<{ className?: string; text: string }> = ({ className, text }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    const textEl = textRef.current;
    if (marqueeEl && textEl) {
      const scrollAmount = textEl.scrollWidth - marqueeEl.clientWidth;
      if (scrollAmount > 0) {
        //50px = 1s
        const animationDuration = 3 + scrollAmount / 50;
        textEl.style.animation = `marqueeAnimation ${animationDuration}s linear infinite`;
      } else {
        textEl.style.animation = '';
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

export { Marquee };
