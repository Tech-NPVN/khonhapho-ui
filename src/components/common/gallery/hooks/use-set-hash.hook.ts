'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook để quản lý hash trong URL.
 *
 * @param {() => void} [callback] - Callback được gọi khi hash bị xóa hoặc thay đổi không khớp.
 * @returns {{
 *   setHash: (newHash: string) => void,
 *   clearHash: () => void
 * }}
 *   - `hash`: string // hash hiện tại
 *   - `setHash`: Hàm để cập nhật hash trong URL.
 *   - `clearHash`: Hàm để xóa hash khỏi URL.
 */

const useSetHash = (callback?: () => void) => {
  const [hash, setHashState] = useState<string>(window.location.hash);
  const hasSetInitialHash = useRef(false);

  const clearHash = useCallback(() => {
    if (!window.location.hash) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setHashState(''); // Cập nhật state hash
  }, []);

  const setHash = useCallback((newHash: string) => {
    if (!newHash.startsWith('#')) newHash = `#${newHash}`;
    if (!hasSetInitialHash.current) {
      history.pushState(null, '', newHash);
      hasSetInitialHash.current = true;
    } else {
      history.replaceState(null, '', newHash);
    }
    setHashState(newHash); // Cập nhật state hash
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setHashState(window.location.hash); // Cập nhật state khi hash thay đổi
      if (!window.location.hash || window.location.hash !== hash) callback?.(); // Gọi callback khi hash bị xóa
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [callback]);

  return { hash, setHash, clearHash };
};

export default useSetHash;
