'use client';

import { useCallback, useState } from 'react';

/**
 * Custom hook bật/tắt chế độ toàn màn hình dựa trên CSS selector
 * @returns [isFullscreen, toggleFullscreen]
 */
const useFullscreen = (): [boolean, (selector: string) => void] => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return console.error(`Không tìm thấy phần tử với selector: ${selector}`);

    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return [isFullscreen, toggleFullscreen];
};

export { useFullscreen };
