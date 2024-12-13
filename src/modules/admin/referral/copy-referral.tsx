'use client';

import { CopyIcon } from '@/components/icons';
import { notification } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

export type CopyReferralProps = {
  className?: string;
  text?: string;
  disable?: boolean;
};
/** Nút copy mã giới thiệu */
const CopyReferral: React.FC<CopyReferralProps> = ({ disable, text, className }) => {
  const [_state, copyToClipboard] = useCopyToClipboard();
  const handleCopy = (text?: string) => {
    if (disable)
      notification.warning({
        duration: 3,
        closable: false,
        placement: 'top',
        message: 'Mã giới thiệu đã hết hạn hoặc đã được sử dụng',
      });
    else
      notification.success({
        duration: 3,
        closable: false,
        placement: 'top',
        message: 'Đã sao chép vào bộ nhớ tạm',
      });
    !disable && copyToClipboard(text ?? '');
  };
  return (
    <div className={clsx('flex justify-center h-8', disable ? 'opacity-60' : '', className)}>
      <div className="flex items-center py-1 border border-black/10 border-solid rounded-lg h-full">
        <div className="text-base cursor-text px-3">{text}</div>
        <div className="h-full w-[1px] bg-black/10"></div>
        <div
          className="cursor-pointer px-3 flex justify-center items-center"
          onClick={() => {
            handleCopy(text);
          }}
        >
          <CopyIcon />
        </div>
      </div>
    </div>
  );
};

export default CopyReferral;
