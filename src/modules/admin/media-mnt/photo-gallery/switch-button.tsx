'use client';

import { CheckIcon, GridSolidIcon, MenuIcon } from '@/components/icons';
import clsx from 'clsx';
import React, { useState } from 'react';

export type SwitchDisplayButtonProps = {
  className?: string;
  value?: 'grid' | 'line';
  onChange?: (value: 'grid' | 'line') => void;
};

/**
 * Nút thay đổi dạng xem trong thư viện ảnh với hiệu ứng giãn rộng
 * @returns
 */
const SwitchDisplayButton: React.FC<SwitchDisplayButtonProps> = ({
  className,
  value = 'grid',
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<SwitchDisplayButtonProps['value']>(value);
  const handleClick = (newValue: SwitchDisplayButtonProps['value']) => {
    if (newValue && newValue !== currentValue) {
      setCurrentValue(newValue);
      onChange?.(newValue);
      localStorage.setItem('admin/media/photo-gallery', newValue);
    }
  };

  return (
    <div className={clsx('flex rounded-[20px] border border-solid border-black/30', className)}>
      {/* Nút Grid */}
      <div
        className={clsx(
          'w-14 h-full cursor-pointer flex items-center justify-center gap-1 px-2 rounded-l-3xl transition-all duration-300',
          currentValue === 'grid' ? '' : 'hover:bg-black/5',
        )}
        onClick={() => handleClick('grid')}
      >
        <div
          className={clsx(
            'overflow-hidden transition-all duration-300',
            currentValue === 'grid' ? 'w-[14px]' : 'w-0',
          )}
        >
          <CheckIcon className="w-full [&_path]:stroke-color_l" />
        </div>
        <GridSolidIcon className={currentValue === 'grid' ? '[&_path]:stroke-color_l' : ''} />
      </div>
      <div className="h-full w-[1px] bg-black/30"></div>
      {/* Nút Line */}
      <div
        className={clsx(
          'w-14 h-full cursor-pointer flex items-center justify-center gap-1 px-2 rounded-r-3xl transition-all duration-300',
          currentValue === 'line' ? '' : 'hover:bg-black/5',
        )}
        onClick={() => handleClick('line')}
      >
        <div
          className={clsx(
            'overflow-hidden transition-all duration-300',
            currentValue === 'line' ? 'w-[14px]' : 'w-0',
          )}
        >
          <CheckIcon className="w-full [&_path]:stroke-color_l" />
        </div>
        <MenuIcon
          width={24}
          height={24}
          className={currentValue === 'line' ? '[&_path]:stroke-color_l' : ''}
        />
      </div>
    </div>
  );
};

export default SwitchDisplayButton;
