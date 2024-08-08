'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface RateProps {
  value?: number;
  classes?: {
    root?: string;
    icon?: { root?: string; icon_forward?: string; icon_behind?: string };
  };
}
const Star = ({
  rate = 1,
  classes,
}: {
  rate?: number;
  classes?: {
    root?: string;
    icon_forward?: string;
    icon_behind?: string;
  };
}) => {
  const yellowStarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (yellowStarRef.current) {
      let present = (rate / 1) * 100;
      present = present > 100 ? 100 : present < 0 ? 0 : present;
      yellowStarRef.current.style.width = `${present}%`;
    }
  }, [rate]);
  return (
    <div className={clsx('w-[10px] h-[10px] relative', classes?.root)}>
      <div className="absolute top-0 left-0 z-0">
        <svg
          className={clsx(
            'w-[10px] h-[10px] text-gray-300 dark:text-gray-500 ',
            classes?.icon_behind,
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
      <div
        ref={yellowStarRef}
        className="absolute w-full overflow-hidden z-[5] h-[10px] top-0 left-0"
      >
        <svg
          className={clsx('w-[10px] h-[10px] text-yellow-300', classes?.icon_forward)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
    </div>
  );
};
function Rating({ value = 0, classes }: RateProps) {
  return (
    <div className={clsx('flex items-center gap-1', classes?.root)}>
      <Star classes={classes} rate={value} />
      <Star classes={classes} rate={value - 1} />
      <Star classes={classes} rate={value - 2} />
      <Star classes={classes} rate={value - 3} />
      <Star classes={classes} rate={value - 4} />
    </div>
  );
}

export default Rating;
