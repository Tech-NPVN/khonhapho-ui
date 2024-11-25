import { RefObject, useEffect, useRef, useState } from 'react';

type OptionsTypes = {
  delay?: number;
};
const useDivWidth = (
  options: OptionsTypes = { delay: 100 },
): { divRef: RefObject<HTMLDivElement>; width: number } => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const newWidth = divRef.current.offsetWidth;
        if (width === 0 || options.delay === 0) {
          setWidth(newWidth);
        } else {
          if (timeoutId.current) {
            clearTimeout(timeoutId.current);
          }
          timeoutId.current = setTimeout(() => {
            setWidth(newWidth);
          }, options.delay);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
      handleResize(); // Set initial width
    }

    return () => {
      resizeObserver.disconnect();
      // Clear timeout khi unmount
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [options.delay, width]);

  return { divRef, width };
};

export { useDivWidth };
