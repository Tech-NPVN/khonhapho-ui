'use client';

import { SmileyFaceIcon } from '@/components/icons';
import { Popover } from 'antd';
import React from 'react';
import EmojiContent from './modal';
import './style.css';
export type EmojiPickerProps = {
  children?: React.ReactNode;
  onSelect?: (emoji: string) => void;
};

const EmojiSelector: React.FC<EmojiPickerProps> = ({ children, onSelect }) => {
  return (
    <>
      <Popover
        rootClassName="[&_.ant-popover-inner]:!p-0"
        trigger={'click'}
        content={
          <EmojiContent
            onSelect={(emoji) => {
              onSelect?.(emoji);
            }}
          />
        }
        destroyTooltipOnHide
      >
        {children ?? (
          <label className="w-8 h-8 rounded-full hover:bg-black/15 dark:hover:bg-white/15 flex items-center justify-center cursor-pointer p-1">
            <SmileyFaceIcon />
          </label>
        )}
      </Popover>
    </>
  );
};

export { EmojiSelector };
