import { useRef, useState, useCallback } from 'react';

type DragScrollHandlers = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  cursor: string;
};

const useDragScroll = (): DragScrollHandlers => {
  const [cursor, setCursor] = useState<string>('default');
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const scrollTop = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX - e.currentTarget.offsetLeft;
    startY.current = e.clientY - e.currentTarget.offsetTop;
    scrollLeft.current = e.currentTarget.scrollLeft;
    scrollTop.current = e.currentTarget.scrollTop;
    setCursor('grabbing'); // Set cursor to grabbing when dragging starts
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    e.preventDefault();

    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    const walkX = x - startX.current;
    const walkY = y - startY.current;

    e.currentTarget.scrollLeft = scrollLeft.current - walkX;
    e.currentTarget.scrollTop = scrollTop.current - walkY;
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      setCursor('grab'); // Reset cursor to grab when dragging ends
    }
  }, []);

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUpOrLeave,
    onMouseLeave: handleMouseUpOrLeave,
    cursor, // Return the current cursor state
  };
};

export default useDragScroll;
