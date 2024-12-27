'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway, useDebounce } from 'react-use';
import { findUserByUserName } from './suggestions-helpers';

export interface SuggestionItemType {
  id: number | string;
  label: string;
}

export type SuggestionPortalProps = {
  query?: string;
  position?: { top?: number; left?: number; right?: number; bottom?: number };
  onClose?: () => void;
  onSelect?: (item: SuggestionItemType) => void;
};

/** Gợi ý tên người dùng khi ấn @ trong comment */
const SuggestionPortalForCommentInput: React.FC<SuggestionPortalProps> = ({
  query = '',
  position,
  onClose,
  onSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [focusIndex, setFocusIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<SuggestionItemType[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useClickAway(suggestionsRef, () => onClose?.());

  const getData = () => {
    if (query.startsWith(' ')) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (controllerRef.current) controllerRef.current.abort(); // Hủy yêu cầu API trước đó
    const controller = new AbortController();
    controllerRef.current = controller;
    findUserByUserName(query)
      .then((result) => {
        if (result.status === 'success') setSuggestions(result.data || []);
        else setSuggestions([]);
      })
      .catch(() => {
        if (!controller.signal.aborted) setSuggestions([]); // Không xử lý nếu bị hủy
      })
      .finally(() => setLoading(false));
  };
  useDebounce(getData, 300, [query]);
  const handleMentionClick = useCallback(
    (item: SuggestionItemType) => {
      onClose?.();
      onSelect?.(item);
    },
    [onClose, onSelect],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (focusIndex > 0) setFocusIndex(focusIndex - 1);
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (focusIndex < suggestions.length - 1) setFocusIndex(focusIndex + 1);
      }
      if (event.key === 'Enter') handleMentionClick(suggestions[focusIndex]);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex, handleMentionClick, suggestions]);

  return ReactDOM.createPortal(
    <div
      ref={suggestionsRef}
      style={{ top: position?.top, left: position?.left }}
      className="fixed z-[9999]"
    >
      <div className="relative">
        <div className="absolute bottom-1 left-0 bg-white dark:bg-background_d dark:shadow-white/10 border rounded-lg shadow min-w-48">
          {loading ? (
            <div className="p-4 text-center">Đang tải...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  'flex gap-2 cursor-pointer p-2 items-center border border-solid border-transparent rounded-lg',
                  index === focusIndex && '!border-link_text_l dark:border-link_text_d',
                )}
                onClick={() => handleMentionClick(item)}
              >
                <div>
                  <Image
                    className="w-8 h-8 rounded-full"
                    src="/images/user-default.jpg"
                    alt="..."
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div>{item.label}</div>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SuggestionPortalForCommentInput;
