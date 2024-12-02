'use client';

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

const useElementSize = <T extends HTMLElement>(
  options: OptionsTypes = { delay: 10 },
): { ref: RefObject<T>; width: number; height: number } => {
  const elementRef = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        const newSize = {
          width: elementRef.current.offsetWidth,
          height: elementRef.current.offsetHeight,
        };
        if (size.width === 0 || options.delay === 0) setSize(newSize);
        else {
          if (timeoutId.current) clearTimeout(timeoutId.current);
          timeoutId.current = setTimeout(() => setSize(newSize), options.delay);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
      handleResize(); // Set initial size
    }

    return () => {
      resizeObserver.disconnect();
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [options.delay, size]);

  return { ref: elementRef, width: size.width, height: size.height };
};

export { useDivWidth, useElementSize };
